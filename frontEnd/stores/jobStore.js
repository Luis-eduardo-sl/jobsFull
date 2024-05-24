import { create } from 'zustand'

const useJobStore = create((set) => ({
  jobs: [],
  setJobs: (newJobs) => set(() => ({ jobs: newJobs })),
  addJob: (newJob) => set((state) => ({ jobs: [...state.jobs, newJob] })),
  removeJob: (id) => set((state) => {
    const jobsFiltrado = state.jobs.filter((job => job.id !== id))
    return {jobs: jobsFiltrado}
  }),
  updateJob: (newJob) => set((state) => ({ jobs: state.jobs.map((job) => (job.id === newJob.id ? newJob : job))})),
}))

export default useJobStore

//state guarda o valor atual de todos os estados como um objeto