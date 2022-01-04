import AppButton from "@/components/Form/AppButton";
import AppCheckbox from "@/components/Form/AppCheckbox";
import AppForm from "@/components/Form/AppForm";
import AppInput from "@/components/Form/AppInput";
import SplitScreenLayout from "@/components/layouts/SplitScreenLayout";
import storeFront from "@/lib/storeFront";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).max(30).required("Password is required"),
  comfirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string(),
  acceptsMarketing: Yup.boolean(),
});

const gql = String.raw;
const query = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String
    $acceptsMarketing: Boolean!
  ) {
    customerCreate(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        phone: $phone
        acceptsMarketing: $acceptsMarketing
      }
    ) {
      customer {
        id
      }
      customerUserErrors {
        code
        message
      }
    }
  }
`;

export default function RegisterPage() {
  const [loading, serLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    const { data } = await storeFront(query, values);
    console.log(data);
  };

  return (
    <SplitScreenLayout>
      <div className="w-full max-w-sm mx-auto lg:w-96">
        <div>
          <img
            className="w-auto h-12"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Grab your account now
          </h2>
        </div>

        <div className="mt-8">
          <div className="mt-6">
            <AppForm
              onSubmit={handleSubmit}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                comfirmPassword: "",
                acceptsMarketing: false,
              }}
              debug
              validationSchema={validationSchema}
            >
              <AppInput name="firstName" label="First name" />
              <AppInput name="lastName" label="Last name" />
              <AppInput name="email" label="Email address" />
              <AppInput name="phone" label="Your phone number (Optional)" />
              <AppInput name="password" label="Password" type="password" />
              <AppInput
                name="comfirmPassword"
                label="Password"
                type="password"
              />

              <AppCheckbox
                name="acceptsMarketing"
                label="Accept marketing email"
              />

              <AppButton>Register</AppButton>
            </AppForm>
            {/* Form Footer start */}
            <div className="flex flex-col items-start justify-between gap-4 mt-10">
              <div className="text-sm">
                <Link href="/auth/login">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login to your account
                  </a>
                </Link>
              </div>
              <div className="text-sm">
                <Link href="/">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Back to home
                  </a>
                </Link>
              </div>
            </div>
            {/* Form Footer end */}
          </div>
        </div>
      </div>
    </SplitScreenLayout>
  );
}
