import Image from 'next/image'

import catError from '../../public/images/error/catError1.png'
import catError2 from '../../public/images/error/catError2.png'
import catError3 from '../../public/images/error/catError3.png'
import catError4 from '../../public/images/error/catError4.png'

export default function CatImage({ number }) {
  switch (number) {
    case 1: {
      return (
        <Image src={catError} alt='catError1' width={300} priority={true} />
      )
    }
    case 2: {
      return (
        <Image src={catError2} alt='catError2' width={300} priority={true} />
      )
    }
    case 3: {
      return (
        <Image src={catError3} alt='catError3' width={300} priority={true} />
      )
    }
    case 4: {
      return (
        <Image src={catError4} alt='catError4' width={300} priority={true} />
      )
    }
  }
}
