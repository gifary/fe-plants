import useSWR from "swr"
import axios from "axios"
import {useRouter} from "next/router";

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/plants`, fetcher)

  const router = useRouter()

  const create = (e) => {
    e.preventDefault()
    router.push('/create')
  }

  return (
    <div className="container mx-auto">
      <div className="columns-12 mt-5 justify-end">
        <button onClick={create} className="justify-end text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Plan</button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
          <tr className="bg-blue-700 text-center">
            <th className="w-1/4
                           min-w-[100px]
                           text-lg
                           font-semibold
                           text-white
                           py-2
                           px-3
                           border-l border-transparent">Name</th>
            <th  className="w-1/4
                           min-w-[100px]
                           text-lg
                           font-semibold
                           text-white
                           py-2
                           px-3
                           border-l border-transparent">Species</th>
            <th  className="w-1/4
                           min-w-[100px]
                           text-lg
                           font-semibold
                           text-white
                           py-2
                           px-3
                           border-l border-transparent">Watering Instruction</th>
            <th  className="w-1/4
                           min-w-[100px]
                           text-lg
                           font-semibold
                           text-white
                           py-2
                           px-3
                           border-l border-transparent">Image</th>
          </tr>
          </thead>
          <tbody>
          {data && data.data.map(function (item){
            return (
              <tr key={item.id} className="border-b py-2 px-2">
                <td className="w-1/4
                           text-sm
                           text-black
                          ">{item.name}</td>
                <td className="w-1/4
                           text-sm
                           text-black
                          ">{item.species}</td>
                <td className="w-1/4
                           text-sm
                           text-black
                          ">{item.watering_instructions}</td>
                <td className="w-1/4
                           text-sm
                           text-black
                           ">
                  <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${item.image}`} width={100}/>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
