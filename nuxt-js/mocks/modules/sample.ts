import { rest } from 'msw'

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
  rest.get(
    'http://dummy.restapiexample.com/api/v1/employees',
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: Samples,
        })
      )
    }
  ),
  rest.get(
    'http://dummy.restapiexample.com/api/v1/employees/:userId',
    (req, res, ctx) => {
      const { userId } = req.params
      const sample = Samples.find(({ id }) => id === userId)

      return res(ctx.json(sample))
    }
  ),
]
