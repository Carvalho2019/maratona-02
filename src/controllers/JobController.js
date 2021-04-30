const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  create(request, response) {
    return response.render("job");
  },

  async save(request, response) {
    await Job.create({
      name: request.body.name,
      "daily_hours": request.body["daily-hours"],
      "total_hours": request.body["total-hours"],
      created_at: Date.now(),
    });

    return response.redirect("/");
  },

  async show(request, response) {
    const jobs = await Job.get();
    const profile = await Profile.get();
    const jobId = request.params.id;
    const job =  jobs.find((job) => Number(job.id) === Number(jobId));
    if (!job) {
      return response.send("Job not found");
    }
    job.budget = JobUtils.calculateBudget(job, profile["value-hours"]);
    return response.render("job-edit", { job });
  },

  async update(request, response) {
    const JobId = request.params.id;
    
    const updatedJob = {
      name: request.body.name,
      "daily-hours": request.body["daily-hours"],
      "total-hours": request.body["total-hours"],
    };

    
    await Job.update(updatedJob, JobId);

    return response.redirect("/job/" + JobId);
  },

  async delete(request, response) {
    JobId = request.params.id;
    await Job.delete(JobId);
    return response.redirect("/");
  },
};
