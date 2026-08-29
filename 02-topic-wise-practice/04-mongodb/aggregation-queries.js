// MongoDB Aggregation Queries Example
const runAggregation = async (StudentModel) => {
    // Calculate department-wise average CGPA
    const result = await StudentModel.aggregate([
        {
            $match: { cgpa: { $gte: 7.0 } }
        },
        {
            $group: {
                _id: "$department",
                totalStudents: { $sum: 1 },
                avgCGPA: { $avg: "$cgpa" }
            }
        },
        {
            $sort: { avgCGPA: -1 }
        }
    ]);
    return result;
};

module.exports = runAggregation;
