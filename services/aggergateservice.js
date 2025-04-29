const orderbooks = require("../models/orderbooks");

const getEachUser= async()=>{
  const stats = await orderbooks.aggregate([
    {
      $lookup: {
        from: "accounts", 
        localField: "email",
        foreignField: "email",
        as: "userDetails"
      }
    },
    // {
    //   $unwind: "$userDetails"
    // },
    {
      $lookup: {
        from: "bookmanages", 
        localField: "bookId",
        foreignField: "bookId",
        as: "bookDetails"
      }
    },
    // {
    //   $unwind: "$bookDetails"
    // },
    {
      $project: {
        _id:0,
        orderId: 1,
        quantity: 1,
        "userDetails.email": 1,
        "bookDetails.title": 1,
        "bookDetails.author": 1,
        "bookDetails.price": 1
      }
    }
  ])

  return stats;
}


const priceOfEachUser= async()=>{
  const totalamount = await orderbooks.aggregate([
    {
      $lookup: {
        from: "bookmanages",
        localField: "bookId",
        foreignField: "bookId",
        as: "bookDetails"
      }
    },
    {
      $group: {
        _id: "$email",
        totalSpent: {
          $sum: {
            $multiply: ["$quantity", { $arrayElemAt: ["$bookDetails.price",1] }]
          }
        }
      }
    }
  ])


    return totalamount;
}


const orderQuantity= async()=>{
  const topQuantity = await orderbooks.aggregate([

    {
      $lookup: {
        from: 'bookmanages',
        localField: 'bookId',
        foreignField: 'bookId',
        as: 'bookDetails'
        }
    },
    {
      $group: {
        _id: '$bookId',
        totalOrdered: { $sum: '$quantity' }
      }
    },
    { $sort: { totalOrdered: -1 } },
    { $limit: 1 },
    // { $unwind: '$book' },
     {
      $project: {
        _id: 1,
        MostOrderedBooks: "$bookDetails.title",
        totalOrdered: 1,
      }
    }
  ])

  return topQuantity;
}



const ordercount= async()=>{
    
  const stats = await orderbooks.aggregate([
    
    {
      $group: {
          _id: "$bookId",
          orderCount: { $count: {} }
      }
  },
 
])

return stats;

}



const spentMost= async()=>{

  const stats = await orderbooks.aggregate([

    {
      $lookup: {
        from: "bookmanages",
        localField: "bookId",
        foreignField: "bookId",
        as: "bookDetails"
      }
    },
    {
      $group: {
        _id: "$email",
        totalSpent: {
          $sum: {
            $multiply: ["$quantity", { $arrayElemAt: ["$bookDetails.price", 0] }]
          }
        }
      }
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 3 }
  ]);
  

  return stats;

}


module.exports = {getEachUser,priceOfEachUser,orderQuantity,ordercount,spentMost}


