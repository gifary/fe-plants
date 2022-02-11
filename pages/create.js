import axios from 'axios'
import {useState} from 'react'
import {useRouter} from "next/router";

export default function Create() {
  const [formStatus, setFormStatus] = useState(false);
  const [query, setQuery] = useState({
    name: "",
    species: "",
    watering_instructions: "",
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
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/plants`,
        formData,
        {headers: {Accept: "application/json"}}
      )
      .then(function (response) {
        setFormStatus(true);
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
          <textarea className="form-input block w-full" rows={5} name="watering_instructions" value={query.watering_instructions} onChange={handleChange()} />
          <label className="block">Image</label>
          <input type="file" name={"image"} className="form-input block w-full" accept="image/*" onChange={handleFileChange()}/>

          <button type="submit" className="mt-4 justify-end text-white bg-blue-700 text-sm px-5 py-2.5 text-center mr-2 mb-2">SUBMIT</button>
        </div>
      </form>
    </div>
  )
}
