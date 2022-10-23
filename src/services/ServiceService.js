import axiosInstance from "../utils/axios"

const ServiceService = {
  getAll: async () => {
    let response = await axiosInstance.get('/services')
    return response.data
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/services/${id}`)
    return response.data
  },
  create: async (service) => {
    if (!service) return

    let response = await axiosInstance.post(`/services`, { service: service })
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/services/${id}`)
    return response.data
  },
  update: async(id, service) => {
    if (!id && !service) return

    let response = await axiosInstance.put(`/services/${id}`, { service: service })
    return response.data
  }

}

export default ServiceService