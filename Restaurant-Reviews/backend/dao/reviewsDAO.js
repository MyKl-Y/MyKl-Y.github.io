import mongodb, {ObjectId} from "mongodb"
//const ObjectId = mongodb.ObjectID

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            console.log("returned");
            return;
        }
        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
            console.log("create new collection");
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in reviewsDAO: ${e}`
            )
        }
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            console.log(user.name, user._id, date, review, restaurantId)
            console.log(user.name, user._id, `${date}`, review, restaurantId)
            const reviewDoc = { 
                name: `${user.name}`,
                user_id: `${user._id}`,
                date: date,
                text: `${review}`,
                restaurant_id: new ObjectId(restaurantId) 
            }
            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: mongodb.ObjectId(reviewId)},
                { $set: { text: text, date: date  } },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }
}