import { http, HttpResponse } from 'msw'

const Samples = [
  {
    id: '1',
    employee_name: 'Tiger Nixon',
    employee_salary: 320800,
    employee_age: 61,
    profile_image: '',
  },
  {
    id: '2',
    employee_name: 'Garrett Winters',
    employee_salary: 170750,
    employee_age: 63,
    profile_image: '',
  },
]

export default [
  http.get('/sample-api/v1/employees', () => {
    return HttpResponse.json(Samples)
  }),
  http.get('/sample-api/v1/employees/:userId', ({ params }) => {
    const { userId } = params
    const sample = Samples.find(({ id }) => id === userId)

    return HttpResponse.json(sample)
  }),
]
