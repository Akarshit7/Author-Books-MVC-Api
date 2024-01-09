exports.failed = (res)=>{
    res.status(400).json({
        status:'failed',
        message:"failed to fetch data",
    })
}

exports.failedToFindBookData = (res,bookId)=>{
    return res.status(404).json({
        status:"failed",
        message:`No Book found with id ${bookId}`
    })
}

exports.failedToFindAuthorData = (res,authorId)=>{
    return res.status(404).json({
        status:"failed",
        message:`No Author found with id ${authorId}`
    })

}

