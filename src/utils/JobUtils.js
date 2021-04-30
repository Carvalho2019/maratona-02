module.exports = {
    remainingsDays(job){
        //Implementar os calculos e restrições(hora, data, etc)
        const remainingDays = (job["total-hours"]/job["daily-hours"]).toFixed();
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)
        const timeDiffInMs = dueDateInMs - Date.now()
        //transformar milisegundos em dias.
        const dayInMs = 1000 * 60 *60 *24;
        const dayDiff = Math.ceil(timeDiffInMs/dayInMs);
        //A diferença de dias (restam X dias)
        return dayDiff;
    },
    calculateBudget: (job, valueHours) => valueHours * job['total-hours']
}