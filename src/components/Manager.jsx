import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();

    console.log(passwords);
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  },[]);

  const deletePassword = async (id) => {
    console.log("delete pass by id", id);
    let c = confirm("Do u really want to do it?");
    if (c) {
    }
    let res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  id }),
    });
    {
      toast("Password deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true, 
        progress: undefined,
        theme: "dark",
      });
      navigator.clipboard.writeText(text);
    }
    setpasswordArray(passwordArray.filter((item) => item.id !== id)); //only keeps if its not equal to id and removes it if its equal to
    // localStorage.setItem(
    //   "password",
    //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
    // );
  };
  const editPassword = (id) => {
    console.log("editing this one", id);
    setform({...passwordArray.filter((item) => item.id === id)[0] ,id :id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const copyx = (text) => {
    toast("Copied to clipbroad!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const showPass = () => {
    if (ref.current.src.includes("icons/eye-slash.svg")) {
      ref.current.src = "icons/eye.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eye-slash.svg";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3

    ) {

       await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });
      passwordRef.current.type = "text";
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
       await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      // localStorage.setItem(
      //   "password",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      setform({ site: "", username: "", password: "" });
      toast("Credentials Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigator.clipboard.writeText(text);
    }
    }

  
  ;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="fixed inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

      <div className=" p-2 md:px-0 md:mycontainer ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-blue-500 text-3xl font-semibold mx-[30%] ">
            <span className=" text-green-500">&lt;</span>
            Passify
            <span className=" text-green-500">/&gt;</span>
          </h1>

          <p className="text-lg text-red-500 ">Your own Password Manager</p>
        </div>
        <div className="text-white flex flex-col  items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website's URL"
            className="rounded-full border-1  px-2 w-[95%] border-blue-900 text-red-300"
            type="text"
            name="site"
            id="3"
          />
          <div className="flex py-3 gap-4  w-[95%] ">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full px-2 border-1 border-red-900 w-full "
              type="text"
              name="username"
              id="1"
            />
            <div className="show  relative w-[60%]">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border-1 px-2 border-red-900 w-full"
                type="password"
                name="password"
                id="2 "
              />
              <span
                className="absolute right-2 top-1 cursor-pointer"
                onClick={showPass}
              >
                <img ref={ref} width={20} src="icons/eye.svg" alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="bg-green-800 flex justify-center items-center border-black border-2 py-2  rounded-2xl w-fit px-3 hover:bg-green-900 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/dhmavvpz.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords text-white py-3 ">
          <h1 className="text-2xl mx-[2%]">Your Passwords</h1>
          {passwordArray.length === 0 && (
            <div className="mx-10">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="w-[100%]  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2 md:rounded-2xl rounded-xl overflow-hidden ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue-900 dark:text-black text-center">
                <tr>
                  <th scope="col " className="px-6  py-4">
                    Site
                  </th>
                  <th scope="col " className="px-6  py-4">
                    Username
                  </th>
                  <th scope="col " className="px-6  py-4">
                    Password
                  </th>
                  <th scope="col " className="px-6  py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-800">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2   text-center w-20">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyx(item.site);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px" }}
                              src="https://cdn.lordicon.com/tbabdzcy.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2  text-center w-20">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>

                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyx(item.username);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px" }}
                              src="https://cdn.lordicon.com/tbabdzcy.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2  text-center w-10">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyx(item.password);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px" }}
                              src="https://cdn.lordicon.com/tbabdzcy.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2  text-center w-10">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            className="bg-red-500 rounded"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/nhqwlgwt.json"
                              trigger="morph"
                              state="morph-trash-out"
                              colors="primary:#121331,secondary:#4bb3fd,tertiary:#646e78,quaternary:#ffffff"
                            ></lord-icon>
                          </button>
                          <button
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            className="bg-red-500 rounded"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/cbtlerlm.json"
                              trigger="hover"
                              state="hover-line"
                              colors="primary:#121331,secondary:#b4b4b4,tertiary:#ffffff,quaternary:#629110,quinary:#3a3347"
                            ></lord-icon>
                          </button>
                          <div
                            className="cursor-pointer"
                            onClick={() => {}}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
