import axios from 'axios'
import {useState} from 'react'
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

const ReactRTE = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

export default function Create() {
  const [wateringInstructions, setWateringInstructions] = useState()

  const [query, setQuery] = useState({
    name: "",
    species: "",
    image: ""
  });
  const router = useRouter()

  const handleFileChange = () => (e) => {
    setQuery((prevState) => ({
      ...prevState,
      image: e.target.files[0]
    }));
  }

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const addPlant = event => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("watering_instructions", wateringInstructions.toString("html"))
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/plants`,
        formData,
        {headers: {Accept: "application/json"}}
      )
      .then(function (response) {
        setQuery({
          name: "",
          species: "",
          watering_instructions: "",
          image: ""
        });
        alert("input success");
        router.push('/')
      })
      .catch(function (error) {
        alert(error.message)
      });
  }


  return (
    <div className="container mx-auto my-5">
      <form onSubmit={addPlant} encType="multipart/form-data" method="post">
        <div className="grid grid-cols">
          <label className="block">Name</label>
          <input type="text" name="name" value={query.name} onChange={handleChange()} className="form-input block w-full" required={true}/>

          <label className="block">Species</label>
          <input type="text" name={"species"} value={query.species} onChange={handleChange()} className="form-input block w-full" required={true}/>
          <label className="block">Watering Instructions</label>
          <ReactRTE
            callBack={setWateringInstructions}
          />
          <label className="block">Image</label>
          <input type="file" name={"image"} className="form-input block w-full" accept="image/*" onChange={handleFileChange()}/>

          <button type="submit" className="mt-4 justify-end text-white bg-blue-700 text-sm px-5 py-2.5 text-center mr-2 mb-2">SUBMIT</button>
        </div>
      </form>
    </div>
  )
}
