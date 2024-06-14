import { useState } from "react";
import axios from "axios";
import "./App.css";

let ourTuple: [number, boolean, string] = [1, true, "Vishva"];

interface CardDetails {
  _id: string;
  name: string;
  cuisine: string;
  address: {
    street: string;
  };
  foodItems: {
    veg: { morning: string[]; evening: string[] }[];
    nonveg: { morning: string[]; evening: string[] }[];
  };
  grades: {
    _id: string;
    grade: string;
    score: number;
    date: { $date: number };
  }[];
}
function App() {
  const [file, setFile] = useState<File | null>(null);
  const [cardData, setCardData] = useState<CardDetails[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const selectFile = async (): Promise<void> => {
    if (file) {
      try {
        const formData: FormData = new FormData();
        formData.append("file", file);
        console.log("formData: ", formData);

        await axios.post(
          "http://localhost:8000/api/v1/upload-json/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("File uploaded successfully!");
      } catch (error: any) {
        console.log("error: ", error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };

  const saveFile = async (): Promise<void> => {
    try {
      await axios.post("http://localhost:8000/api/v1/upload-json/save");
      alert("File stored to database successfully!");
    } catch (error: any) {
      console.log("typeof", typeof error);
      console.log("error: ", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const getData = async (): Promise<void> => {
    try {
      const result = await axios.get(
        "http://localhost:8000/api/v1/upload-json"
      );
      alert("File details retrieved successfully!");
      setCardData(result.data.data);
    } catch (error: any) {
      console.log("error: ", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const addYear = async (): Promise<void> => {
    try {
      const result = await axios.patch(
        "http://localhost:8000/api/v1/upload-json/add-year"
      );
      alert(result.data.message);
    } catch (error: any) {
      console.log("error: ", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const addFoodItems = async (): Promise<void> => {
    try {
      const result = await axios.patch(
        "http://localhost:8000/api/v1/upload-json/add-food-items"
      );
      alert(result.data.message);
    } catch (error: any) {
      console.log("error: ", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const addDosa = async (): Promise<void> => {
    try {
      const result = await axios.patch(
        "http://localhost:8000/api/v1/upload-json/add-dosa"
      );
      alert(result.data.message);
    } catch (error: any) {
      console.log("error: ", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="App">
      <h1 style={{ color: "white" }}>JSON upload task</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={selectFile}>Save JSON</button>
        <button onClick={saveFile}>Store in Database</button>
        <button onClick={getData}>Get</button>
        <button onClick={addYear}>Add Year</button>
        <button onClick={addFoodItems}>Add Food Items</button>
        <button onClick={addDosa}>Add Dosa</button>
      </div>
      <div className="cardContainer">
        {cardData &&
          cardData.map((details: CardDetails) => {
            return (
              <div key={details._id} className="card">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* <p>id:{details._id?.toFixed()}</p> */}
                  <h5>Name : {details.name}</h5>
                  <p>Cuisine : {details.cuisine}</p>
                  <p>Address : {details.address.street}</p>
                </div>

                <div className="foodCardContainer">
                  <div>
                    <h4>Veg</h4>
                  </div>
                  <div className="foodCard">
                    <h5>Morning</h5>
                    {details.foodItems?.veg
                      .map((foodData) => foodData.morning)
                      .flat()
                      .map((items) => {
                        return (
                          <p style={{ textAlign: "left", marginLeft: "20px" }}>
                            {items}
                          </p>
                        );
                      })}
                  </div>
                  <div className="foodCard">
                    <h5>Evening</h5>
                    {details.foodItems?.veg
                      .map((foodData) => foodData.evening)
                      .flat()
                      .map((items) => {
                        return (
                          <p style={{ textAlign: "left", marginLeft: "20px" }}>
                            {items}
                          </p>
                        );
                      })}
                  </div>
                </div>

                <div className="foodCardContainer">
                  <div>
                    <h4>Non Veg</h4>
                  </div>
                  <div className="foodCard">
                    <h5>Morning</h5>
                    {details.foodItems?.nonveg
                      .map((foodData) => foodData.morning)
                      .flat()
                      .map((items) => {
                        return (
                          <p style={{ textAlign: "left", marginLeft: "20px" }}>
                            {items}
                          </p>
                        );
                      })}
                  </div>
                  <div className="foodCard">
                    <h5>Evening</h5>
                    {details.foodItems?.nonveg
                      .map((foodData) => foodData.evening)
                      .flat()
                      .map((items) => {
                        return (
                          <p style={{ textAlign: "left", marginLeft: "20px" }}>
                            {items}
                          </p>
                        );
                      })}
                  </div>
                </div>

                <div className="innerCardContainer">
                  {details.grades.map((gradeData) => {
                    const date = gradeData.date.$date;
                    if (gradeData.score >= 10) {
                      return (
                        <div key={gradeData._id} className="innerCard">
                          <h6>Grade : {gradeData.grade}</h6>
                          <h6>Score : {gradeData.score}</h6>
                          <h6>Date : {new Date(date).toLocaleDateString()}</h6>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;

// import { useState } from "react";
// import Button from "./Button";
// import Child from "./Child";
// import Child2 from "./Child2";
// import UseReducer from "./useReducer";
// const App = () => {
//   const [data, setData] = useState<string | null>(null);
//   console.log("data: ", data);
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setData(event.target.value);
//   };

//   return (
//     <>
//       <Child>Placeholder text</Child>
//       <Child2>
//         <Child>Oscar goes to Dicrapio</Child>
//       </Child2>
//       <Button handleClick={(event) => console.log("Button clicked", event)} />
//       <input type="text" onChange={handleChange} />
//       <h1>{data}</h1>
//       <UseReducer/>
//     </>
//   );
// };
// export default App;
