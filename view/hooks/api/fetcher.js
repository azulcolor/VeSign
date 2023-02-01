import axios from 'axios'

export const fetcher = (url, date = '') =>
  axios
    .get(url, {
      params: { date },
      headers: {
        'x-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsInVzZXJOYW1lIjoic2VudGVuY2VwcnVlYmEiLCJpZFJvbCI6MiwiaWF0IjoxNjc0MTQwODE1LCJleHAiOjE2NzQxNDE3MTV9.D2MsXKVpNlngfWl6j0kr_Xl3J1gZqr9NTnnPExYcaFA',
      },
    })
    .then((res) => res.data)
