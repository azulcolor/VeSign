import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

//Refactorizar este código
export const deleteAlert = async (deleteById, id) => {
  try {
    const result = await MySwal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#FA6161',
      confirmButtonColor: '#4a88ff',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    })

    if (result.isConfirmed) {

      await deleteById(id)

      await MySwal.fire(
        'Eliminado',
        'El template ha sido eliminado con éxito',
        'success'
      )

      window.location.reload()
    }
  } catch (error) {
    console.error(error)
    await MySwal.fire('Error', 'Ha ocurrido un error', 'error')
  }
}
