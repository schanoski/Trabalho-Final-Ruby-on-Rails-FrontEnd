import axiosInstance from "../utils/axios"

const CategoryService = {
  getAll: async () => {
    let response = await axiosInstance.get('/categories')
    return response.data
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/categories/${id}`)
    return response.data
  },
  create: async (category) => {
    if (!category) return

    let response = await axiosInstance.post(`/categories`, { category: category })
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/categories/${id}`)
    return response.data
  },
  update: async(id, category) => {
    if (!id && !category) return

    let response = await axiosInstance.put(`/categories/${id}`, { category: category })
    return response.data
  }

}

export default CategoryService