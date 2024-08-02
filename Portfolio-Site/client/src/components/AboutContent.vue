<template>
    <div v-if="resumes && resumes.length > 0" class="about">
        <pre class="img">::::::::::::::::::::^::::::^:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::^^:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
!~~!^::::::::::::::^::::::^^^^:::::::^::::::::::::::::::::::^^^:::::::::::::::^^::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
^^^^:::::::::::::::^::::::^^::::::::::::::::^::::::::::::^^::::::::::::::::^^:^^::::::::::::::::::::^^::::::::::::::^^::::::::::^:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.::::::::.:::.::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::^^::::::::
::::::::::::::::::::::::::::::::::::::.::::::::::::::::::.::....:::.:::::::::::::::::::..::::::::....................::...::.:::::::..................:::::..:::.....:.:::::.:::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::~~:::.:::::::.:::.:::::.:::::::^::::::::::::..:::::::::::::::::::::::.::.......:....::::.........................::.....:::........................................
:::::::::::::::::::::::::::::::::::::::::::::::::::::::.......:::::::::.....:::::::^~^::::::^^:::::::::::::::::::::^::^^^^:^^^::........::::::......:.::::::::::........................:....:.......:.:
::::::::::::::::::::::::::::::::::::::::::::.:::::::::::::::::::::.::::::~!~!!!!!!~~~~!!!~~!!!!~~^:^^:::::..:^~~~!!!7?Y55PP5555YJ?!~::....:::.....::::::::::......................:.....::.::.:::...::::
::::::::::::::::::::::::::::::^^^^^^^^::::::::::::^^^^^^^:::::::.:^!7777???77!!!77????7????JJJ?7???777??7!~7JJ5PGGGBBBBBGGBBBBBBBBBGP5J?!^:.....::::::::::::......::::::..:...:::::......:::...:::::::::
:^^^::::::::::::::::::::::::::::::^^^:::::::::::::::::::::::.::.~?JJ??J??777!!7?JJYYYYJYPPP55PPPJY5Y5J?7J5GP5YPGBGGBB#B######BBBBBBBBBBBBG5J7~^:::.::::.:::::::::::::::^::::::^^::::::.:.:::::::::::::^^
::::::::::::::::::::::::::::::::::::::::::::::::::..:::::::::..7YYJ??7?JYJYYY5555PPPGG55GBBBBBBBBBBGGGPJPP55PGGPGB##############BBBBBBBBB#BBBGP5?7~::..::..:::^:::::::::.::::::::::::::.::::::::^^:::::~
^::^^^^^^^^~~~!~^:.::::::::::::::^:::::.:.:::::::::^::::::^:^~?YYYYJ?JY55PBBBBGGGBBGGBBGGB##########BB5PPJYPPGPG####&####&&&&&&&&######BBBB##BBBBGGPJ7~:.....::^^^^^^^~~~~~~~^^:::...::.::::::.........:
!!?7~~~!~~!!!~~7!!~~~!!!~~!!~!~~!!!77~~~~^~!~~~~!~!7~~~~~~~~!JYY55555Y?YPB#######B###BB####&&&&&&&###Y?5J?YPPYPBP5G#&&&&&&&&&####&&&########BBB#BBBBBGP5J7~:^!~~~~^^^~~^~~~~~~~^^^^^:^~^^^:^~~^^:^:^^^^:
!?7!!!!!!777!~!77!!!777777!7777!!7?7!!7?7!!?7!77?!!7!!!~!!?JYJYPGG5YY555GBB##&&&&&##########&&&&&&&#GJPPPG5PBGGPPB##########&&&&&&&&&&&&######BB##BB##BGPPP?!7!~~!!~!77~~!!~~~7!^~7!~!77!~~77!77!~~77!~7
~77!~~!!!!!~~!!!!~~~~~!!^^~!!~~~!~~~~~~~!!!~~!!~~^~~~!!~~JYJ5555YJ??Y5GGBB###&&&&&&&##&######&&&&&&&BGBBBPP##GPG###BBB####&&&&&&&&&&&&&&&&&&####BBBGGB##BGGGPJ^~~~!~~!~^^~^^~~~~~~!~^~!^~~~!^~!~:~!!!~~~
77!!!!777~!77~~!~~~~!7~~~~~!~^~!!~!7~^^!!!~^~77!~!777!^!Y5YJJJYYY555PGGB###&&&&&&&&&&##&##B#&&##&&@&#BB####&&&&@&BPGB#&&&&####&&&&&&&&&&&&@@&&&####BBGB###BGPGY~^~!~^~!~~~!!~^~~~^^^~!!!^~!~~~!~^^~!^^!~
7?!!!!!77?7~!7!!!!!!!!!!!~77!!~~!7!!!!!7!!7!!!77!!77~~7JY5YYY5YJ??YPPGBB####&&&&#&&&&&&&#####&&&&&@&####&&&&@@&#G5P#&#BBBB#B#B##&&####&&&&&&&&&&&#####BBBBBBBGGY~!~!!^~!!~!~!~7!!!!~!7!~~~!7~~!~~~^~!!~~
!^~777!!~!~^!!!7!!!~!!!~!!77!~~~7!!7777!!!!!!!~~~~~!~77!?555YJJ??JPGBB###&&&&&&&&&&&&&&&&&####&&&&&&####&&&@@&#GPBBPY5PGBB###############&&&&@@&&&&&&&##B##BBBB5?!~^^~~!!7~~~~~^!7!^~~^~!!!!~~^^~~!!!^~~
~~!!~!!~!!!~~~~!^^~~!~~!~~!!!!~^!!!!~~!77~^~~!~^~~^~!?!!Y55555YY5GBB###&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&&&@&###&#BGBBGGBB###&&&###&&&&&#####&&@&&&&&&&&##B#BGBPJJJ7~!~!!!~~~^^^!!!~!~^~~~^~~~!~~^^~~~!~
!~~~^^~!~^!7~~~!~~!!!!^^~!!^~!!~~~~^^~~~~~!~~~~^~~~~7!?Y55PGGPPPBB####&&&&@@@@@@&&&&&&&&&&&&&&&&&&&&###&&&&&##&&&&&&##B#&&&&&&&&&&&&&&&&&&&####&&&&&&&&&&##B#BB#5?J?J7^^!!~^~^~~~^~^:~~~!~^^~~!^:^^~^^~^
!^~^^!~!^~!~~~~~~!!7!~~~^^!~!~~~!~~^^~~!~~!^^~~~^^~7?Y5YYGB#GGPPGGB####&&&@@@@@@@&&&&&&&&&######&&&######&&##&&&&&&&&&@@@@@@@@@@&&&&&&&&&&&&&&###&&&&&&&&&&#BB##BJ77???!!~~~!!~!~^~^~!~!!!~:~~~~^^~^^^~^
~!~^~!!~~^~7!~!~^!~~~~~^^~~^~~~!!~~~~~~~~~~~^!!^:^^J5PPGP55YJJJ5PBBB##&&&@@@@@@@&&&&&#BBBBGGGBBBBBBBBBB#########&&&&&&&&&&@@@@@@@@&&&&&&&&&&&&&&&&##&&&&&&&&#BBBBBY?77?7!~~~!^:~~^!!~^~!^!~:^^~!^:~~~~^:
~~~~~~^~~^~!~!!~~~^~~~^^~!^^~^~~~!~~!~~~!!~~^~!~^^~5GPP5JJ???J5PPPGB#&&@@@@@@&&&&&##BGP555555Y555555555PGGBBBBBBBBBB######&&&&@@@@@@@@&&&&&&&&&&&&&&##&&&&&&&#BBBBBGJ7!77~~!7^^~~~~^^^~~^~~^::^~^^:~!^~~
~!!!~~!~~~!!~~!!~~~~7!!!!!~!7!~~~!~^~~~!!^^!!7!!~~!JYJJYYYYYY5YJ5PB#&@@@@@@@&&&#BGPP5YYJJJJJJJJYYYYYYYYY555PPPPPPPPGGGGGBBB###&&&@@@@@&&&&&&&&&&&&&&&&&&##&&&&#B####BY?7!!!^~~!!~~^^~~^~^^~~!!~~~~!~~~^~
!7!!~~~^^~~~~~~^^^!~~!!~~~7!~^~~~~~^~~~~!~!~~~~~^7JYY5PPPGG55Y55PG&@@@&@@&&&&#BP55YYJJJJJJJJJJJJJJJJJJYYYYYYY555555PPPPPPPGGGBB##&&&@@@@&&&&&&&&&&&&&&&&&#######B####B5???!~^^~!^^^~~~^~^^^~~!^~~~~!~~~~
~~~^^^~^~~^~~~~~^^^^~!~^^~!!^^~^^^~~^:~~~^^^~!!7JY5PPGGGGP555PPB&@@@&&&&&&&#BG55YYYJJJJJJJJJJJJJJJJJJJJJJJJYYYYYYY55555PPPPPPPGGBBB##&@@@&&&&&&&&&&&&&&&&&&#####BB##BBBJ??7!~:^^^^^~~^^~!!~^~~^~^^~~~^~~
~~~~~~~~!~!7~~!~!~~~^^~~^~~^^^~~~!!!~^~~~~~!7?J5PPPGGGPP55PGB#&@@@&&&&&&&#BGP5YYJJJJJJ?JJJJJJJJJJJJJJJJJJJJJYYYYYYYYY55555555PPPGGGBB##&@@@&&&&&&&&&&&&&#&&&&&###B###BBGYY!~!~^^^^^^~~^~^^^~^~~^^^^:^^!~
^~^^~^:~!~^^~!~~~^^~^^^~^~~~~^:~~~~~^^^^~^!?JYGGPPPPPPPGGBB#&@@@@@&&@&&##GP5YYJJJJ?J????????JJJJJJJJJJJJJJJJJYYYYYYYYYYYYY555555PPGGBBB#&&@@&&&&&&&&&&&&&####&&##BB#&#BBB5?7~^^^:.:::^^^^^::~~~~!7!!~~~:
^!7!~~~!!!~^!!!!~~~!!~~~~!7!~^~!!~^!~^~~~~JY?555PPGGGGBB##&&@@@&&&&&###BG5YYJJ??????????????JJJJJJJJJJJJJJJJJJJJJJYYYYYYYYYYY555PPPGGGBB##&&@&&&&&&&&&&&&&####&&##B###BBBGJ?~~^~~!7!!!..^....:^!?JY5Y?: 
~^^~~~~^^~^~~^^~~~~~~~~!~~~!!!~!!~~~^^~!~~?JYGPPGGBBBB##&@&&@@&&&&####BG5YJJ?????????????????JJJJJJJJJJJJJJJJJJJJJJYYYYYYYYYYYY5PPPPGGGBB##&&&&&&&&&&&&&&&&####&&#BB###BBBY?7!7?JJJ??!:~~^^^::::.:~77~~^
^^~~^~^~^^~^^::^~^^^::~^^:^~^^~~^~~^^^~^^~^?PPGB#BBBBBB&@&#&&&#&&##BBGGPYJ????????????????????JJJJJJJJJJJJJJJJJJJJJYYYYYYYYYYYY555PPPGGGBB#&&&&&&&&&&&&&&&&#####&&BB###BBG5!^!?77~!~~^:^^^~77?77~^:~?7!^
^^^::^^~^~!~!!!~^!!77!~!~~~~~!!~~~~!~~~~~~~!PG#&&&#BBB#@@#G#&######BBGPYJ???77777??????????????JJJJJJJJJJJJJJJJJJJJYYYYYYYYYYY55555PPPGGGBB#&&&&&&&&&&&&&&&&#####&#B#&##BB?~:~!~~^^~~~~!7?JJYJ?!^.^!~~!7
~~~!!^^^^^~!~~~!!~!7!!!!!!^~!~~^!7!~77~!!!!7YB&&&#BBBG&@&BG###&#BBBBGPYJ777??????????????????????JJJJJJJJJJJJJJJJJJJJJYYYYYYYY5555555PPGGBB##&&&&&&&&&&&&&&&&##B#&&##&##BB?~^~~^^^~!??77!7!!!~~^^^^^^!??
!??77J??7~!7JJJ7!~7!!?J77!!??7?!!7!7!~^~!77~!?YBGGBBBB&@&BGB###BBBGP55J?7!!777777777??7777?????????JJJJJJJJJJJJJJJJJJJYYYYYYYYY5555555PPGGGB##&&&&&&&&&&&&&&###BB#&&&####GY~^^::^^^^^^^~?JJ?!!!!!~~^~~~~
?YY7~!7~~!?7Y5YJJ?YJJ7J?77!7??~~!!!!!!~~!!7!~!!7?GB#B#@&#BGBBBBGP55Y??7~~^^^^^^^^~!!!77777??????????JJJJJJJJJJJJJJJJJJJJJYYYYYYY555555PPPGGGB##&&&&&&&&&&&&&###BBB##&&BP555Y7~^7?7^^^!7~77!!7~~7~~^~!~~~
?7!~^^~!!!~^~~~~~~7!77!777!!!!7777?7777???777?7^JBB###@&#BGGGGP5YJJ7!!~^:::::::~7??7?????????J?????JJJJJJJJJJJJJJJJJJJJJJJJYYYYYY55555PPPPGGBB##&&&&&&&&&&&&####BGB##&5^:^~!!!!!77?777!~^::^^~^::^^:^^~^
~~^^^~~~~^^::::::^~!!~!~~~!77777?J?!!77!!7~:^^^^GG####&#BGGPPPYY777!~^^^:::^~7?J555PPPPPPP555YYJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJYYYY5555PPPPGGGBB#&&&&@&&&&&&&#####BGGB#PJ~^~!!7!7~~~~~!!!~~!7!7!^~!!~~~!7
^^~!!~~~^~^^^~^~~~^^^^^^~~~~~^~~!7!^~~!77~~~^^^?BG###B##BGGPP5Y?!!^^^^^::^~7?JYY55555555PGGGGGP555YYJJJJJJJJJJJJJJJJJJJJJJJJJJYYYYYY555PPPPGGGB##&@&@@&&&&&&#####BGGBGP57~^:^!7~~~^!777~:^7?7!::!7~^^^::
:::::.:::::^^^~~^^:^^^^~!^::^~!!!~^^^~!!!~~~~^~YGB#######BPPPYY!~^::::::^~!7??77???JJJJYYYYYY55555555YJJJJJJJJJJJJYYYYY555PPPPPPPPPPPPGGGPPPGGBB#&&&@@&&&&&&######BB#5YP?~!!^:^^::^^^^^^^~~::^^^^^^::.:^
^^~^~^^:^^^^^^^^^^~^::.:^^^^~!~~~~^:^~~^~^^~^:^?5GB######BGGPPP?!::::::^~!!!!7???JJJJYYYY55555YYYY555YYYYYYYYYJYYYY555PGGGGGGBBBBBBBBBBBBBGGGGGB#&&@&@&&&&&#&#####BBB7?P7^^::......:::^^~^^^:^^::^^^::::
:^~^~^:^::^:^^~~^^::^^^^:::::::^^::::::^:::^^:^^!5GBBBBBBGB##GP?777!^^^~~!7??7!!77???JJJJJJJYYY55YYYYYYYYYYYYYYYYYY555555555P555555PPPPPGGBBGGGB##&@@@&&&&&#&##B##BBY^Y5~^~^^~^^^~~~:^^^:^^::^^^^^^:.::^
!!!!~~^~!!~~~!!~~!!!~!~~^!!~!~~~!~~!^~!~!~!!^~!~!J?YYPGPY5GBPY7:::^!777JYY?7!7?JY5PPPPPPP555YYYYYY5YJJJJJJYYYYYYYYYYY555555Y5YYYYYYY55PPPPPGGGGGB#&@@@&&&&&##&#BBB#B??57^~!!~^^^^~~~^^^^^^:.:^^^^::::::.
~^^^^^~^~~:^~^~~~^^::^^^^::::^^::^:^^^^^:::^^^^:^~^~~YPPY?J5Y7::::::^~7J5J7?JY55555555PPGGGGPP555YJY5YYY5555P55YYY5555YYYYYYYYJJJJYYYYYY55P5PPGGB#&&@@@&&&##&&BBBBB57!!^::^~^:.::::.::..:^~7JJJYJJ?JJ7~!
:^^^:~::^^:::::^~~~~~77???7!?7!~~!!!~~~~!~~!!~^^~~^~~YPP577JJ~:::::::^^~77777!77??J??JJJJJYY5555YYYJ5GJYYJYYY5PPGG555555PPPPPP555YYYYYYYYYYP55PGB#&&&@@&&&##&&#BBBPJ7~^^^^^:::::::::::...~?JJ???77?7!!!7
:^^^^::::::^^:^^~~!7???J???77777!!~~^^^~!!7???JYYJJ?~?5P?:^??^::::::::::^^~!7????JJJYYYYYYYY555YYYYJJY7?JJJJYYY5G5Y555PPPPPPPPPGGGGGP5YYY55YPBGBBB#&&@@&&###&&#GGP!~:^:::::::^::::::::.......:::::::::::
^^:^!~~^:~~^^^~^^^::^~^^::^^^^:^:~:.^^:^::!~^^^~!!~^:?5Y:^!J7:::::::..::^^~!!7??JJJJYYYYYYYYYYJJJJJJ?J???JJJYY555Y5YY55555YYJJJJJY55PPP5555Y5PPPGG##&&&&#B####B5J~:^:.:^^^:^^^:^^::::::::^^:^~!~~~^^^:^~
^~~^^^^:^^::^^^::^^~~::^~^::^~^^^~::^~^^~^^~^^^:^^^~^?5~!?JY7::::::::.::^^~!!77??JJJJJJJJJJJJJJJJJJ7JJ??JJJJY55PYY5YYYY55555YYYYYYYYY55555YYJ555PGB##&&#B#####P7^::.::::^:::^:^!~:^^^^~~~!~:^^~~^~!~^~~^
^~^^~~~~~~^^^~~^^^~^^^^^~~^^^~~~^^^^^::^^:^^~^~~^^^^:?J!JJYJ!::::::::::::^~~!77?????JJJJJJJJJYJJJJ7!Y???JJJJJY5PPJYYYYYYYYYY55YYYYYYYYYYYYYYJ5555PGB###B##GG#B?~:^^:::^:^^::^^^^^^^^^^^^^^::^^:.:^:^:^^^
^^^~~^~~~~~~~~^~~^^^^^^^^~~~!!~^^^~^^^^^^^:.:^~^:::::?77YYY7~::::::::::::^~~!7?????????JJJJJJYJJ?!~77???JJJJJY555JYYYYYYJJJJJJYYYJJJJJJJJYJJYY55555B#####G7JY?~^:::^::.::.::::::^^:^^^:.:^^::^^:^:::..::
.:^::^~^:^:::~^^::^~::^~^^^:^^^^^::^:^::::.:^:^^::::.!!~?YY?^:^^:::::::^^^~!77????????JJJJJJJ??!~~!~~~!7??JJJJY55YJYYYYYJJJJJJJJJJJJJJJJJJJJJJYYY5PGBBBPP7.::.:::.:::.....::...:..:::::.::^:.::::::::^^^
:^~:^~^^^:^::^^:::::::::^::.:^^^^::^^^:::^^^^::::^~^::~^^!77^^^^:^^::^^^~~!777?????????JJYYY7!!!~^^:.^!7??JJJJJYY5YYYYYYJJJJJJJJJJJJJJJJJ??JJJJJJJYJYPY55:...::::::::^:::::^::::.::^:^::::::::::::^::^:^
^^^^~::~~^^^^^~~^:::~~::^^::^~^^^~~^~^:^^^^^^:::^~^::.^^:.:~~^^::^^^^^^~!!77??????????JJYYY?77??7!^:^~7??JJJJJJJJY55YY55YYJJJJJ?JJJJ??????JJJ???????Y5?57::.::::::::::::^^::::::.::.:...::::::::::^^^:::
^!!~~:^~^^::^^^^::::^^^^^^~~~~~^~~^^^^^::::::::.::::::^^:..^~^^::^^^^^~~!77?????JJJJJYY555PY???!~!7!!77??JJJJJJJJJJY55555YYJJJJ?????????????????????YYJY^:::^^^^^^^^^^^^^^:^^^:::^::.::.::::::^^^^~~^~^^
^^^^~~~^^~~~~^^^::^~^~~^^^^^~!~~~~~~^^^^:::::^:.::^::.:::::^^^^::^^^~~~!77?????JJJJYY555YY5YJ??7777?????JJJ???JJJJJJJY5555YYJJJJJ???????????????????5JJ?.:^^^^::^~^^^^^^^:^^^^^:^~~^^^^::::::^^^^^^^:^^^
^^^~!!~~~~~~^^~~^~~~^~::~::^!~^^~~::^^:~^^^^~~^^::^^::^^~!?7^^^^^^^~~~~!7?????JJJJY55YYYYYYY5YYYYYYYYJJJJJJJJJJJJJJJJY55Y555YJJJJJ?????????????????JPJY~:^^^^^::^^^::::::::::^::^~~::^:^~::^^^^^:::::^::
^~~~^^^^~~:::^^~!^::~~^^^::~~~~:::::~~~~^^~^^:^:^^^::^~7?JJ?^^^^^^^~~~~!7????JJJJY55555555555PPPPPPP555YYY5555PPP555555YYYY55YJJJJ?????????????????YYYJ:^^:::.::^^^:::^::....:^::^^^:::^^:..^::..:::::..
.^^^^^:^:.:^^:^^^:.:::^^::^^^:::..:::^:::::^^:::::::::.::^..^^^^^^^~!!!!7???JJJJYGGPGGGGP555Y5PGPPPPPPP555PPPPGGGGGPPPPP55555P5JJJJJ?JJJJ?????????JJJJY7:::^^:::::^^^:....:..:.:..:::::..:..::::....:^::
:^^~~^:^^::.:^^:.:::^:::::::::^::::^:::^:^::..^^^::^:....::^!^^^^^~~!!!!7???JJJJ5BGBBGGG5YYJJJYYYYYYYY555555555PPPPPPGGGGGGGPPP5JJJJJJJJJJ????????JJJJY7.::::::^^^^^^^::...:^::::...:^:.::::::::.:::^^::
~~^~!~~^^~^:^~^^^~~:^:^^~~~~~~^:^:^^:::^^^~^:^^::^^^::^~7??JY7^^^^~!77!!!7???JJY5GPGGPP5YYYYYYYYYYYYYYYYYYYYY5YYYYYYYY5PGGBBBGGPJJJJ???JJJ???????JJJJJ7..::.:::.:^^^:::~^::::^^:.::::::::::::^:::::^:.::
~~~~~^^~~^^^~~^~!~~^^^^~~^~~^^^~!^^^^^:^~~^:.:::^!!77JYYYYJYGG~^^^~!!77!!!???JJJY5555PGGB##55Y7JJ7JYJJYYYYY5YJY5YY55PP555PGBGGP5JJJJ???JJ????????PPJ!^.  .....:::^^^::^^^::::^:::::::::::::::::^^^^^:^~^
::^::~~^^^^:::~^~^^^^~^::.::::^^::^^^^:^^:^!?JYJJYYPPYYPGYYP#&P^~^~!!7?!~!7??JJJJYYYY55555PPGY?J!~7!~~!7!!!77!7?77Y5##BBGGPPPP5JJJJJ????J???????5GB#G5Y?7~^:.:.:^^:.::::.:^^::::^^:::.::::::::.:..:.:^::
^^:.^^^^:::^^.:^~~^:.::::::::^:::^:.:~7J5GGP5YJYPBB5JP#&P?P#&&B~~~~~!7?7~!7???JJJYYYYYYJYYYYYYYYJJYJ777?!!7?77?YJJPPPP5555555YJJJJJJ????J????J?5&#GG#&#BG555J?!~::..::^:^:^::..:::..::~::^^^::::::.:^^^:
::..::::..:^^:::^^^:.:^^::::::::^~7YPGGGPJ?JYGB#&G?YB&&#JYB###B~^!~~!!77!!!7??JJJJYYJJJJJJJJJJJYYYYYYYYYYYY55Y55555YYYYYYYYYYJJJJJJJJJJ?????J?5&@&&BG#####GP55555J7^...:^^^^^:::^^^:::^^^^^^:^:..:^:....
..:.::....::::^^^^:::^::....:^7J5PGP5J77?YPB#&&BY?P&&&&5YPB###&7:~!~~!!77!77???JJJJJJJJJJJJ???JJJJYYYYYYYYYYYYYYYYJJJYYYYYYJJJJJJJJJJJ???JJJJ5&&&@&&BB###&&#BGP55555YJ7^.:...::..::...:::::::....:::::::
:^^~^~^^^^.::^^^^^^^^^^^:^!?YPP5Y??77?J5PB#&&B5?JG#&&&BY5B###&&J:^~!!~!!7777??JJJJJJJJJJJJJ?????JJJJJJJJJJJJJJJJJJJJJYYYYYJJJJJJJJJJJJJJJJJJ5&&#&&&&#BB#&&&&&##BGPPPPPP5Y?~. .:...::::::::..::::.:::^^::
~~~^~~^:::^~^^^^^:::::^~?YYYJ???777?JYPB#&#GYJJYPGB#&&#55G##&&&G^^^!!!!!!777???JJJJJ?JJJJJJJ???JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ5&&&&&&&&&#BB#&&&&&&&#BBGGGGGGPPY7~:..:::::::.:::^:::::::^:::
^^:::~^:::^^:^^^^:.:~?JYYJ?7??77?JYY5PB#BPY555Y5BB#&@@#PYB##&&&&7^^~!!!!!!77777????????JJJJJ?JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJYYYB&@&&&&&&&#####&&&&&&&&##BBGGGGGGGPY7~^::::::.:::^:::::::.::^
::..:^:::..:::::.:!?JJ?????7???JY555GGP55PP5YY5GB#&&@&#GPB#&&&&&P^^~~!!!!!!7777777!!!!77???JJJJJJJJJJJJJJJYYJYYJJJJJJJJJJJJJJJJJJJJJJYYYYY5&&@&&&&&&&&&####&&&&&&&&###BBGGGBGGGPPY!::~::..:^^^:::^^^:^^^
^^^~!^::^~~!~^^~7?J???JJ????JJYYY555555G#PYY55PB#&&&&&#BBB#&&&&&#J^~~!!!77!7777777!~~~~!!7??JJ??JJJJJYJYYYYYYYYJJJJJJJJJJJJJJJJJJYYYYYYYYYB&@@&&&&&@&&#&&&#&&&&&&&&&&###BBBGBBBGGPP5?~^!7?7!!!^!!!7???7~
::^^^::::^:.^~7?JJJJJJ???JJY5555PPGGB##BG5555PB##&&&@&#B###&&&&&#B7~!!!!77777777777!~~~!!7??????JJJJJYYJYYJJJJJJJJJJJJJJJJJJJJJYYYYYYYYYYP&&@@&&&&&@@&&#&&&&&&&&&&&&&&####BBBBBBBBGPPPYJ?JJJJJJJJJJJJJJJ
!!!!~~~~!^~7?JJJJJJJ???YPPPP55PPGBB#####G555PB##&&@&&&#B###&@@&&##G!!!!!7777777777?7!!!!!7?????JJJJJYYYJJJJJJJJJJJJJJJJJJJJJYYYYYYYYYYYY5&&@@@&&&&&@&&&&&&&&&&&&&&&&&&&&#####BBBBBBBBGGP5YJJJJJJJJJJJJJY
??????7777?J?JJJJJ??JYPPPP55PPGGBBB####BP55PG###&&&&&&#####&&&&&###Y!!!!77777???J????7777?????JJJJJYYYYJJJJJJJJJJJJJJJJYYYYYY55YYYYYYYY5&&&@@&&&&&&@@&&&&&&&&&&&&&&&&&&&&#######BBBBBBBBGGP5J???JYYYYJJJ
JJJ??777??J????JJJYY5PGPPPGBBBB##BB###BP55PGB#&&&&&&&&####&&&&@&&#&GY7!7777??????JYYJJJJJJJJJJJJJJYYYYYYYYYJJJJJYYYYY55555555YYYYYYYYYP&&&@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#######BBBBBBBBBGG5J!!!!!7^:~
?J??77?JJ??JYYYYY55PPPGGGB#######BBGBGPPPPGB##&&&&&&&&#####&&&&&&&&&P57!7777??????JYYYYY5Y555YYYYYYYYYYYYYYYYYY555PGPGP555YYYYYYYYYYYG&&&&@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#######BBBBBBBBBGGPJ!^^~::^
!777?????JY5YYYY5PPPPGBBB######BBGGPPPPPPGB###&&&&&&&&&####&&&&&&&#&#5P?777?????????JJY55PPP55P5555YYY55555PPPPGGBBGGP55YYYYYYYYYYYYG&&&&@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&######BBBBBBBBBBPJ~.:~
~7???JJJYYYYYY555PPPGBB#########BGPPPGGGGB###&&&&&&&&&&###&&&&&&&&&&&B5PJ77????????JJJJJY5PPGPPPPPPPPPGGGGBBBBBBBGPP5YYYYYYYYYYYYY5B&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#######BBBBBBBBBGY7~
?7?Y5YYYYYYY55P55PPGBB##########BGPPPGGB###&#&&&&&&&&&&###&&&&&&&&&&&&G5P5??????JJJJJJJJJJYYY555PPPPGGGGPGGGGPPP5YYYYYYYYYYYYYYYYP#&&&&&&@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&######BBBGGGBBBGY
?YP5JJYYYYYY555PPGGB############BGGGGBB####&&&&&&&&&&&&&###&&&&&&&&&&&&G5GPJ?JJJJJJJJJJJJJJJJYYYYYY55555555YYYYYYYYYYYYYYYYYYYYYP#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&###&&########BBGGGBB
55YYYYYYYYY55PPGGBB#######&&&##B#BGGB######&&&&&&&&&&&&&##&&&&&&&&&&&&&&G5PG5JJJJJJJJJJJJJJJJJYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY5G#&&&&&&&@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#############BGGG
5YYYY55Y5YY55PGGBB#####&&&&&&####BB######&&&&&&&&&&&&&&&###&&&&&&&&&&&&&&BPPGG5JJJJYYYYYYYYYYJYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY5G#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#############BB
5YY55P5PPPYY5PGB#####&&&&&&&#############&&&&&&&&&&&&&&&&##&&&&&&&&&&&&&&&#GPPBG5YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY5PB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#############
5YY55PPGGG5J5PB#######&&&&&&########&&&&#&&#&&&&&&&&&&@&&##&&&&&&&&&&&&&&&&&GPPGBGP5YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY5PGB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##############
YY55PPPGGBBYJPG###&###&&&&&&#######&&&&&##&#&&&&&&&&&&&&&##&&&&&&&&&&&&&&&&&&BGPPGBBGP5YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY5PBBB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##############
55PPGPPGBB##5YB##&###&&&&&&&######&&&&&&&#&#&&&&&&&&&&&&&&##&&&&&&&&&&&&&&&&&&BPPPPGGBGGP55YYYYYYYYYYYYYYYYYYYYYYYY55PGBBGB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#############
5PPPGGGBB##&#YG##&&&&&&&&&&######&&&&&&&&&&&&&&&&&&&&&&&&&&#&&&&&&&&&&&&&&&&&&&BGPGGGGGGGBGGP555YYYYYYYYYYYYYY555PPGGBBBG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#############
PPGGGBBBB##&&PP###&&&&&&&&&&###&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&&&&&&&&&&&&&&&&&&&&BPGGGGGGGGGGGGGGGPPPPPPPPPPGGGBBBBBBGG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##############
GGGGBB#####&&GP##&&&&&&&&&&&&#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@#GGPPGGGGGGGGGGGGBBGBBBBBBGGGGGGGB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#####&&&#&#&###
GGGGG######&&BP##&&&&&&&&&#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@&&&&&&&&&&&&@&#BBGGPGGGGGGGGGGGGGGGGGGGBBB##&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&###&&&&&&&&&##
GBBGB#BB###&&#P#&&&&&&&&&#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#BBBBGGGGGGGGGGGGGGGGBBB##&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&&&&&&&&&###
GBBBB####&&&&#P#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@&&&&&&&&&&#&&&&&#####BBBBBBBBBBBBB###&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&&&&&&&&&&###
GBBB####&&&&&&PB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@@@@&&&&&&&&&&&&&&&&&&&#############&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&&&&&&&&&&&###
BB######&&&&&&PB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@&&&&&&&&&&@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&&&&&&&&&&&&###
BB#####&&&&&&@GG&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&###&&&&&&&&&&&#####
B#B####&&&&&&@BG&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@&&&&&&&&&&@@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&&&&&&&&&&&#####
BBB####&&&&&&@#G#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@&&&&&&&&&&&&@@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&&&&&&&&&&&#####&
BB#####&&&&&&@&B#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@&&&&@@@&&&&&&&&&&&@@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&&&&&&&&&&&####&&
########&&&&&@&B##&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&###&@&&&&&&&&&####&&&
#######&&&&@@@&###&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@&&&&&@&&&&&&&&&&&@@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&@@&&&&&&&&###&&&&&</pre>
        <abbr title="Hello">
            <Typewriter title="¡" :words="greetings" />!
        </abbr>
        <p>
            My name is
            <strong>{{ resumes[0].name }}</strong>
        </p>
        <br/>
        <p>
            I'm a passionate and driven individual currently pursuing a Computer Engineering 
            major at <strong>Georgia Institute of Technology</strong>, 
            specializing in Distributed Software 
            and System Design and Signal and Information Processing. 
            With minors in Robotics for Automation, Perception, and Applications of 
            Artificial Intelligence and Machine Learning, 
            my academic journey is rich and diverse, encompassing topics 
            like computer vision, machine learning, digital system design, and more.
        </p>
        <br/>
        <p>
            My professional experience includes a software engineering internship at Home Depot, 
            where I showcased adaptability and innovation, and various roles at a local company, 
            where I honed my skills in system engineering and management. I have also 
            undertaken numerous projects, such as developing a Student Management Dashboard with 
            MongoDB, creating APIs for course and task management, and designing a NeoLoad API workflow 
            integrated with Google Cloud and BigQuery.
        </p>
        <br/>
        <pre class="headers">BS CmpE @ GT      Intern end        Intern end        Intern end             ?</pre>
        <pre class="dates">  202▓.08           2023.08           2024.08           2025.08           ???????</pre>
        <pre>     ╚════════╦════════╩════════╦════════╩─═─═─═─═┬═─═─═─═─╩─═─═─═─═┬═─═─═─═─╩─═─═─═─═ ⋯ →</pre>
        <pre class="dates">           2023.05           2024.05           2025.05           {{ resumes[0].education.expected_grad_date.replace('-','.') }}</pre>
        <pre class="headers">        Intern @ KNC     SWE intern @ THD   SWE intern @ ???   Graduate BS</pre>
        <br/>
        <p>
            Beyond my academic and professional pursuits, I have a multitude of interests ranging 
            from high-fidelity audio, gaming, and space, to personal finance, fitness, and fashion. 
            My hobbies reflect my love for learning and creativity, with a particular fondness for 
            food and art.
        </p>
        <br/>
        <p>
            Balancing my professional aspirations with personal commitments, I am also a proud parent 
            to a wonderful ▓-year-old son, finding immense joy and accomplishment in parenthood. 
            As I aim for an MBA or MS in Machine Learning, AI, or Data Science, followed by a PhD, 
            my ultimate goal is to excel as an AI or Robotics Engineer, contributing to 
            advancements in technology while embracing the journey of continuous learning and growth.
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { Resume } from '@/types';
import Typewriter from './Typewriter.vue';

export default defineComponent({
    name: 'AboutContent',
    setup() {
        const greetings = [
            "Hello",      // English
            "Hola",       // Spanish
            "Bonjour",    // French
            "Hallo",      // German
            "Ciao",       // Italian
            "Olá",        // Portuguese
            "Привет",     // Russian
            "こんにちは", // Japanese
            "你好",        // Chinese (Mandarin)
            "안녕하세요",  // Korean
            "مرحبا",      // Arabic
            "Hej",        // Swedish
            "Hej",        // Danish
            "Hallo",      // Dutch
            "Γειά",       // Greek
            "नमस्ते",      // Hindi
            "สวัสดี",      // Thai
            "Selamat",    // Indonesian/Malay
            "Aloha",      // Hawaiian
            "Shalom"      // Hebrew
        ] as string[];

        const resumes = inject<Resume[]>('resumes');

        return {
            resumes,
            greetings
        };
    },
    components: {
        Typewriter
    }
});
</script>

<style scoped>
.about {
    font-size: 1rem;
}
.headers {
    color: var(--header-color);
}
.dates {
    color: var(--user-color);
}
.img {
    float: left;
    margin-right: 1rem;
    font-size: 4px;
    line-height: 3px;
    letter-spacing: -1px;
    background-color: var(--text-color);
    color: var(--background-color);
    font-weight: bold;
}
strong {
    font-weight: bold;
}
</style>