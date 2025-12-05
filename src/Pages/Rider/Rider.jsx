import React from "react";
import riderImage from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Rider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // react from hook
  const { register, handleSubmit, control } = useForm();

  // This oid for Rider Region and District Selction
  const serviceCenter = useLoaderData();
  const regionsDupliacte = serviceCenter.map((center) => center.region);
  //set korer mane hosse kono duplicate thakbe na
  const regions = [...new Set(regionsDupliacte)];

  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtByRegion = (region) => {
    const regionsDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionsDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    axiosSecure
      .post("/riders", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center-center",
            icon: "success",
            text: "Your application has been submitted. We will reach to you within 45 days!",
            showCancelButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-20 bg-white rounded-4xl my-8">
      <div className="mb-8 pb-10 border-b-2 border-black/10">
        <h2 className="font-extrabold text-[42px] mb-5">Be a Rider</h2>
        <p className="w-full lg:w-1/2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="flex flex-row justify-between gap-10">
        {/* Be a rider Form */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="text-black!"
          >
            <fieldset className="fieldset">
              <h3 className="font-bold text-3xl mb-2">
                Tell us about yourself
              </h3>

              {/* Rider Name */}
              <label className="label label2">Your Name</label>
              <input
                type="text"
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="Your Name"
                {...register("riderName")}
              />

              {/* Rider Email */}
              <label className="label label2">Your Email</label>
              <input
                type="text"
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Your Email"
                {...register("riderEmail")}
              />

              {/* Rider Phone Number */}
              <label className="label label2">Phone Number</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Phone Number"
                {...register("riderPhoneNumber")}
              />

              {/* Rider Region and District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Rider Region */}
                <fieldset className="fieldset">
                  <label className="label label2">Your Region</label>
                  <select
                    defaultValue="Select Region"
                    className="select w-full"
                    {...register("riderRegion")}
                  >
                    <option disabled={true}>Select Region</option>
                    {regions.map((region, i) => (
                      <option key={i} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Rider District */}
                <fieldset className="fieldset">
                  <label className="label label2">Your District</label>
                  <select
                    defaultValue="Your District"
                    className="select w-full"
                    {...register("riderDistrict")}
                  >
                    <option disabled={true}>Select District</option>
                    {districtByRegion(riderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>

              {/* Rider NID No */}
              <label className="label label2">NID No</label>
              <input
                type="number"
                className="input w-full"
                placeholder="NID No"
                {...register("riderNIDNo")}
              />

              {/* Driving License Number */}
              <label className="label label2">Driving License Number</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Driving License Number"
                {...register("riderLicenseNumber")}
              />

              {/* Bike Brand Model and Year */}
              <label className="label label2">Bike Brand Model and Year</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Bike Brand Model and Year"
                {...register("bikeBrandModel&Year")}
              />

              {/* Bike Registration Number */}
              <label className="label label2">Bike Registration Number</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Bike Registration Number"
                {...register("bikeRegistrationNumber")}
              />

              {/* Tell Us About Yourself */}
              <label className="label label2">Tell Us About Yourself</label>
              <textarea
                className="textarea h-20! w-full"
                placeholder="Tell Us About Yourself"
                {...register("aboutRider")}
              />
            </fieldset>

            {/* Form Submit Button */}
            <input
              type="submit"
              value="Submit Application"
              className="font-bold py-3 px-8 rounded-xl bg-primary cursor-pointer mt-10"
            />
          </form>
        </div>

        {/*Rider Image */}
        <div className="flex-1">
          <img src={riderImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
