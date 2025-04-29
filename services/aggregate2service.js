const orderbooks = require("../models/orderbooks");
const { ordercount } = require("./aggergateservice");

const singlebookorder = async () => {
    const stats = await orderbooks.aggregate([
        {
            $sort: { quantity: -1 }
        },
        {
            $limit: 1
        },
        {
            $lookup: {
                from: "accounts",
                localField: "email",
                foreignField: "email",
                as: "users"
            }
        },
        {
            $lookup: {
                from: "bookmanages",
                localField: "bookId",
                foreignField: "bookId",
                as: "books"
            }
        },
        {
            $project: {
                _id: 0,
                email: 1,
                quantity: 1,
                "books.title": 1
            }
        }
    ]);

    return stats;
}

const orderonce = async()=>{
    const stats = await orderbooks.aggregate([
        {
            $group: {
                _id: "$bookId", 
                orderCount: { $sum: 1 } 
            }
        },
        {
            $match: { orderCount: 1 }
        },
        {
            $lookup: {
                from: "bookmanages",
                localField: "_id",
                foreignField: "bookId",
                as: "books" 
            }
        },
        {
            $project: {
                _id: 1, 
                title: "$books.title",
                orderCount : 1
            }
        }
    ]);
    return stats;
}

const eachmonth = async () => {
    const stats = await orderbooks.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$orderDate" },
                    bookId: "$bookId"
                },
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $sort: { "_id.month": 1, totalQuantity: -1 }
        },
        {
            $group: {
                _id: "$_id.month",
                bestSellingBook: { $first: "$_id.bookId" },
                maxQuantity: { $first: "$totalQuantity" }
            }
        },
        {
            $project: {
                _id : 0,
                bestSellingBook : 1,
                maxQuantity : 1
            }
        }
    ]);
    return stats;
}

const morespent = async () => {
    const stats = await orderbooks.aggregate([
        {
            $lookup: {
                from: "bookmanages",
                localField: "bookId",
                foreignField: "bookId",
                as: "books"
            }
        },
        {
            $group: {
                _id: "$email",
                totalSpent: { $sum: { $multiply: ["$quantity", "$books.price"] } },
                orderCount: { $sum: 1 }
            }
        },
        {
            $match: {
                totalSpent: { $gt: 500 },
                orderCount: { $lt: 3 }
            }
        }

    ]);
    return stats
}

const avgprice = async()=>{
    const stats = await orderbooks.aggregate([
        {
            $lookup: {
                from: "accounts",
                localField: "email",
                foreignField: "email",
                as: "users"
            }
        },
        {
            $group: {
                _id: "$email",
                averageBookPrice: { $avg: { $multiply: ["$quantity", "$books.price"]} }
            }
        },

    ]);
    return stats;
}

module.exports = {singlebookorder,orderonce,eachmonth,morespent,avgprice}