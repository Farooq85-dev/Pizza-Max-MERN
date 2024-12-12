import { useFormik } from "formik";
import Input from "../Components/Input";
import ButtonComp from "../Components/Button";
import { checkoutSchema } from "../Schemas";
import { FaRegUserCircle } from "react-icons/fa";
import { MdConfirmationNumber, MdEmail } from "react-icons/md";
import TextArea from "../Components/TextArea";
import { LuMessageSquareMore } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import Result from "../Components/Result";
import { ImSpoonKnife } from "react-icons/im";

const initialValues = {
  fullName: "",
  phone: "+92",
  emailAddress: "",
  address: "",
  specialMessage: "",
  promoCode: "",
};

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [subtotal, setSubtotal] = useState(0);
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    const price = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(price);
  }, [cartItems]);

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: checkoutSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div className="mt-20">
      <Breadcrumb
        className="p-4 pb-0 sm:px-10 text-sm"
        items={[
          {
            title: <Link to="/">Home</Link>,
          },
          ...paths.map((path, index) => ({
            title: (
              <Link
                to={`/${paths.slice(0, index + 1).join("/")}`}
                className={index === paths.length - 1 ? "!text-red-600" : ""}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            ),
          })),
        ]}
      />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 sm:py-4 sm:px-10"
      >
        <div className="form-container">
          <div className="flex flex-col justify-start gap-4 bg-white shadow-md rounded-xl py-4 px-6">
            <Input
              id="fullName"
              name="fullName"
              label="Full Name"
              ariaLabel="fullName"
              type="text"
              icon={<FaRegUserCircle size={18} />}
              placeHolder="Enter full name."
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.fullName && errors.fullName ? (
              <p className="text-base text-red-600">{errors.fullName}</p>
            ) : null}
            <Input
              id="phone"
              name="phone"
              label="Phone Number"
              ariaLabel="phone"
              icon={<FaRegUserCircle size={18} />}
              type="text"
              placeHolder="Enter phone number."
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phone && errors.phone ? (
              <p className="text-base text-red-600">{errors.phone}</p>
            ) : null}
            <Input
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              ariaLabel="email"
              icon={<MdEmail size={18} />}
              type="email"
              placeHolder="Enter email."
              value={values.emailAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.emailAddress && errors.emailAddress ? (
              <p className="text-base text-red-600">{errors.emailAddress}</p>
            ) : null}
            <TextArea
              id="address"
              name="address"
              label="Address"
              ariaLabel="address"
              placeHolder="Enter your address."
              icon={<LuMessageSquareMore size={18} />}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address && errors.address ? (
              <p className="text-base text-red-600">{errors.address}</p>
            ) : null}
            <TextArea
              id="specialMessage"
              name="specialMessage"
              label="Special Message"
              ariaLabel="specialMessage"
              placeHolder="Like about allergy, sugar or delivery instructions etc."
              icon={<LuMessageSquareMore size={18} />}
              value={values.specialMessage}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address && errors.specialMessage ? (
              <p className="text-base text-red-600">{errors.specialMessage}</p>
            ) : null}
          </div>
        </div>
        <div className="review-cart-container flex flex-col justify-start gap-4 py-4 px-6 rounded-xl shadow-md">
          <h1 className="textbase sm:text-lg font-semibold mb-2">
            Review Your Cart...
          </h1>
          {cartItems?.map((product) => (
            <div
              key={product?.id}
              className="review-cart-product flex flex-col sm:flex-row justify-start gap-4 border-t p-2 rounded-md  bg-scrollBarColor"
            >
              <div className="left-side">
                <div className="product-image">
                  <img
                    className="rounded-md w-full h-full sm:h-32 sm:w-32 object-cover"
                    src="https://em-cdn.eatmubarak.pk/55083/dish_image/1717390225.jpg"
                    alt="loading..."
                  />
                </div>
              </div>
              <div className="right-side flex flex-col justify-between gap-1">
                <div className="product-detail flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                  <h3 className="text-base sm:text-xl font-font-medium">
                    {product?.title}
                  </h3>
                  <h4 className="text-base sm:text-lg font-normal">
                    x{product?.quantity}
                  </h4>
                </div>
                <div className="product-price flex justify-end sm:justify-start">
                  <h5 className="text-base font-bold text-btnColor rounded-md">
                    Rs {product?.price}
                  </h5>
                </div>
              </div>
            </div>
          ))}
          {cartItems?.length > 0 ? (
            <>
              <Link to={"/"}>
                <span className="hover:text-red-600 underline flex justify-end">
                  +Add more items
                </span>
              </Link>

              <Input
                id="promoCode"
                name="promoCode"
                label="Promo Code"
                ariaLabel="promoCode"
                type="text"
                icon={<MdConfirmationNumber size={18} />}
                placeHolder="Enter Promo code."
                value={values.promoCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.promoCode && errors.promoCode ? (
                <p className="text-base text-red-600">{errors.promoCode}</p>
              ) : null}
              <div className="place-order-details-container flex flex-col gap-1 p-2 rounded-md  bg-scrollBarColor">
                <div className="subtotal-container flex justify-between items-center w-full">
                  <h4 className="text-base font-medium">Subtotal</h4>
                  <h4 className="text-base font-medium">Rs: {subtotal}</h4>
                </div>
                <div className="delivery-container flex justify-between items-center w-full">
                  <h4 className="text-base font-medium">Delivery Charges</h4>
                  <h4 className="text-base font-medium">
                    Rs: {cartItems?.length <= 4 ? 100 : 150}
                  </h4>
                </div>
                <div className="grandtotal-container flex justify-between items-center w-full">
                  <h4 className="text-base font-bold">Grand Total</h4>
                  <h4 className="text-base font-bold">
                    Rs:{" "}
                    {cartItems?.length <= 4 ? subtotal + 100 : subtotal + 150}
                  </h4>
                </div>
                <ButtonComp
                  id="place-order-btn"
                  name="place-order-btn"
                  type="submit"
                  title="Place Order"
                  className={
                    "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base"
                  }
                />
              </div>
            </>
          ) : (
            <Result
              icon={<ImSpoonKnife size={50} />}
              text="Your cart is empty!"
              btnText="Add items"
              url={"/"}
              isBtn={true}
              className={
                "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base"
              }
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
