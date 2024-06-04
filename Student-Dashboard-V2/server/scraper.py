import requests
import sys 
import json 
import datetime
from bs4 import BeautifulSoup

def get_course_headers(degree_type):
    if (str(degree_type).lower() == "undergraduate"):
        url = 'https://catalog.gatech.edu/courses-undergrad/'
    elif (str(degree_type).lower() == "graduate"):
        url = 'https://catalog.gatech.edu/courses-grad/'
    elif (str(degree_type).lower() == "all"):
        url = 'https://catalog.gatech.edu/coursesaz/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    course_headers = []

    for header in soup.select('div#atozindex h2.letternav-head + ul > li > a'):
        course_headers.append(header.text.split('(')[-1].split(')')[0])

    return course_headers

def get_course_details(course_code):
    url = f'https://catalog.gatech.edu/coursesaz/{str(course_code).lower()}/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    course_details = []

    for block in soup.select('div.sc_sccoursedescs div.courseblock'):
        title = block.select_one('p.courseblocktitle').text
        desc = block.select_one('p.courseblockdesc').text.strip()
        course_code, name, credit_hours = title.split('. ', 2)
        credit_hours = credit_hours.split(' ')[1]

        course_details.append({
            'course_code': course_code.replace('\xa0', ' ').strip(),
            'name': name.strip(),
            'credit_hours': credit_hours,
            'description': desc
        })

    return course_details

def get_course_term_details(term, course_code, course_number):
    url = f'https://oscar.gatech.edu/bprod/bwckctlg.p_disp_course_detail?cat_term_in={term}&subj_code_in={course_code}&crse_numb_in={course_number}'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    course_details = {}

    # Extract course title and description
    if not soup.select_one('td.nttitle'):
        return course_details
    course_title = soup.select_one('td.nttitle').text.strip()
    course_details['title'] = course_title.split(' - ')[1]
    course_details['course_code'] = course_title.split(' - ')[0]

    description_section = soup.select_one('td.ntdefault')
    description_parts = description_section.text.strip().split('\n')
    course_details['description'] = description_parts[0].strip()
    
    # Extract credit hours
    for part in description_parts:
        if 'Credit hours' in part:
            parts = part.strip().split(' ')
            temp = []
            for i in range(len(parts)):
                if not len(parts[i]) == 0 and ".0" in parts[i] and not "0.0" in parts[i]:
                    temp.append(parts[i].strip())
            course_details['credit_hours'] = temp

    # Extract prerequisites and restrictions
    prerequisites = []

    # Check for prerequisites
    prereq_section = description_section.find('span', text='Prerequisites: ')
    if prereq_section:
        prereq_text = prereq_section.find_all_next('a')
        for prereq in prereq_text:
            if "bwckctlg.p_display_courses?term_in=" in str(prereq):
                if len(prereq.text) > 1:
                    prerequisites.append(prereq.text)

    course_details['prerequisites'] = prerequisites

    return course_details

if __name__ == "__main__":
    degree_type = sys.argv[1]

    date = datetime.datetime.now()
    if (date.month >= 1 and date.month < 5):
        term = f'{date.year}02'
    elif (date.month >= 5 and date.month < 8):
        term = f'{date.year}05'
    elif (date.month >= 8 and date.month <= 12):
        term = f'{date.year}08'

    print(f'Getting courses for term {term}')

    final = []

    course_headers = get_course_headers(degree_type)
    for header in course_headers:
        print(f'Getting courses for {header}')
        course_details = get_course_details(header)
        for course in course_details:
            print(f'Getting course details for {course["course_code"]}')
            course_code_and_number = str(course['course_code'])
            course_number = course_code_and_number.split(" ")[1]
            course_code = course_code_and_number.split(" ")[0]
            course_term_details = get_course_term_details(term, course_code, course_number)
            course_dict = {}
            if not len(course_term_details) == 0:
                course_dict = {
                    'course_code': course_code_and_number,
                    'name': course['name'],
                    'credit_hours': course['credit_hours'],
                    'description': f'${course['description']} ${course_term_details['description']}',
                    'prerequisites': course_term_details['prerequisites']
                }
            else:
                course_dict = {
                    'course_code': course_code_and_number,
                    'name': course['name'],
                    'credit_hours': course['credit_hours'],
                    'description': course['description'],
                    'prerequisites': []
                }
            final.append(course_dict)
    
    with open('courses.json', 'w') as f:
        json.dump(final, f, indent=4)

