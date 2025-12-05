import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // This oid for Sender/ Receiver Region and District Selction
  const serviceCenter = useLoaderData();
  const regionsDupliacte = serviceCenter.map((center) => center.region);
  //set korer mane hosse kono duplicate thakbe na
  const regions = [...new Set(regionsDupliacte)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionsDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionsDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    const idDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (idDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You have to pay ${cost} for this delivery!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        //Save the parcels info to the data base
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("hello");

          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "I!",
              text: "Parcel has created. Please pay",
              showCancelButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-20 bg-white rounded-4xl my-8">
      <div className="mb-8">
        <h2 className="font-extrabold text-[42px] mb-5">Send A Parcel</h2>
        <p className="font-bold text-2xl">Enter your parcel details</p>
      </div>

      <form onSubmit={handleSubmit(handleSendParcel)} className="text-black!">
        {/* Parcel type (Document or Not) */}
        <div className="flex md:flex-row gap-10 border-t-2 pt-10 border-black/10">
          <label className="label">
            <input
              type="radio"
              value="document"
              className="radio radio-success"
              defaultChecked
              {...register("parcelType")}
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              value="non-document"
              className="radio radio-success"
              {...register("parcelType")}
            />
            Not Document
          </label>
        </div>

        {/* Parcel Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 mb-8 border-b-2 border-black/10">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Parcel Name"
              {...register("parcelName")}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              className="input w-full"
              placeholder="Parcel Weight (KG)"
              {...register("parcelWeight")}
            />
          </fieldset>
        </div>

        {/* Sender/Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender Details */}
          <div>
            <fieldset className="fieldset">
              <h3 className="font-bold text-xl mb-2">Sender Details</h3>

              {/* Sender Name */}
              <label className="label label2">Sender Name</label>
              <input
                type="text"
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
                {...register("senderName")}
              />

              {/* Sender Email */}
              <label className="label label2">Sender Email</label>
              <input
                type="text"
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Sender Email"
                {...register("senderEmail")}
              />

              {/* Sender Phone No */}
              <label className="label label2">Sender Phone No</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Sender Phone No"
                {...register("senderPhone")}
              />

              {/*Sender Address */}
              <label className="label label2">Sender Address</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Sender Address"
                {...register("senderAddress")}
              />

              {/* Sender Region and District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sender Region */}
                <fieldset className="fieldset">
                  <label className="label label2">Sender Region</label>
                  <select
                    defaultValue="Select Region"
                    className="select w-full"
                    {...register("senderRegion")}
                  >
                    <option disabled={true}>Select Region</option>
                    {regions.map((region, i) => (
                      <option key={i} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Sender District */}
                <fieldset className="fieldset">
                  <label className="label label2">Sender District</label>
                  <select
                    defaultValue="Select District"
                    className="select w-full"
                    {...register("senderDistrict")}
                  >
                    <option disabled={true}>Select District</option>
                    {districtByRegion(senderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>

              {/* Pickup Instruction */}
              <label className="label label2">Pickup Instruction</label>
              <textarea
                className="textarea h-30! w-full"
                placeholder="Pickup Instruction"
                {...register("pickupInstruction")}
              />
            </fieldset>
          </div>

          {/* Receiver Details */}
          <div>
            <fieldset className="fieldset">
              <h3 className="font-bold text-xl mb-2">Receiver Details</h3>

              {/* Receiver Name */}
              <label className="label label2">Receiver Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Receiver Name"
                {...register("receiverName")}
              />

              {/* Receiver Email */}
              <label className="label label2">Receiver Email</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Receiver Email"
                {...register("receiverEmail")}
              />

              {/* Receiver Contact No */}
              <label className="label label2">Receiver Contact No</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Receiver Contact No"
                {...register("receiverContact")}
              />

              {/* Receiver Address */}
              <label className="label label2">Receiver Address</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Receiver Address"
                {...register("receiverAddress")}
              />

              {/* Receiver Region and District */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Receiver Region */}
                <fieldset className="fieldset">
                  <label className="label label2">Receiver Region</label>
                  <select
                    defaultValue="Select Region"
                    className="select w-full"
                    {...register("receiverRegion")}
                  >
                    <option disabled={true}>Select Region</option>
                    {regions.map((region, i) => (
                      <option key={i} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Receiver District */}
                <fieldset className="fieldset">
                  <label className="label label2">Receiver District</label>
                  <select
                    defaultValue="Receiver District"
                    className="select w-full"
                    {...register("receiverDistrict")}
                  >
                    <option disabled={true}>Select District</option>
                    {districtByRegion(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>

              {/* Delivery Instruction */}
              <label className="label label2">Delivery Instruction</label>
              <textarea
                className="textarea h-30! w-full"
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
              />
            </fieldset>
          </div>
        </div>

        <div>
          <p className="mt-5">* PickUp Time 4pm-7pm Approx.</p>
        </div>

        {/* Form Submit Button */}
        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className="font-bold py-3 px-8 rounded-xl bg-primary cursor-pointer mt-10"
        />
      </form>
    </div>
  );
};

export default SendParcel;
