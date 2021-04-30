const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  async index(request, response) {
    const job = await Job.get()
    const profile = await Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: job.length,
    };
    // Total de horas por dia de cada job(project) in progress
    let jobTotalHours = 0;
    const updatedJobs = job.map((job) => {
      const remainings = JobUtils.remainingsDays(job);
      const status = remainings <= 0 ? "done" : "progress";
      //Somando a quantidade de status
      statusCount[status] += 1;
      // Total de horas por dia de cada job(project) in progress
      jobTotalHours = status === 'progress' ?  jobTotalHours + Number(job["daily-hours"]) : jobTotalHours; 
      /*if (status == "progress") {
        jobTotalHours += Number(job["daily-hours"])
      }*/
      return {
        ...job,
        remainings,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hours"]),
      };
    });
    // calco de horas livre no dia
    //qtd de horas que quero trabalhar dia (Profile)
    //menos
    //Qtd de horas/dia de casa job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;
    return response.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount,
      freeHours,
    });
  },
};
