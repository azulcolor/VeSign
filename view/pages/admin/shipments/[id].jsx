import { veSignApi } from '../../../api'

export default function Shipment({ client }) {

  console.log(client)

  return (
    <>
      <p>Shipment {client.fullname}</p>
    </>
  )
}
export const getStaticPaths = async () => {
  const { data } = await veSignApi.get('client/idClient')

  return {
    paths: data.map(({ idDocument }) => ({
      params: { id: idDocument.toString() },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  let { id } = params
  id = parseInt(id)

  try {
    const { data } = await veSignApi.get(`client/client/${id}`)
    const { client } = data

    console.log(data)

    return {
      props: {
        client,
      },
      revalidate: 3,
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}
