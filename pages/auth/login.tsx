import { setCookies } from "cookies-next";

import AppButton from "@/components/Form/AppButton";
import AppForm from "@/components/Form/AppForm";
import AppInput from "@/components/Form/AppInput";
import ValidationErrors from "@/components/Form/ValidationErrors";
import SplitScreenLayout from "@/components/layouts/SplitScreenLayout";
import storeFront from "@/lib/storeFront";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

const gql = String.raw;
const query = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        message
        field
      }
    }
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).max(30).required("Password is required"),
});

export default function LoginPage({ toast }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log({ values });
    setErrors([]);
    const {
      data: { customerAccessTokenCreate },
    } = await storeFront(query, values);
    setLoading(false);

    if (customerAccessTokenCreate.customerUserErrors.length) {
      setErrors(
        customerAccessTokenCreate.customerUserErrors.map(
          ({ message }) => message
        )
      );
      return;
    }

    toast.success("Successfully logged in!");
    setCookies(
      "token",
      customerAccessTokenCreate.customerAccessToken.accessToken
    );
    router.push("/dashboard");
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8">
          <div className="mt-6">
            <ValidationErrors className="mb-6" errors={errors} />
            <AppForm
              onSubmit={handleSubmit}
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
            >
              <AppInput name="email" label="Email address" />
              <AppInput name="password" label="Password" type="password" />
              <AppButton loading={loading}>Login</AppButton>
            </AppForm>
            {/* Form Footer start */}
            <div className="flex flex-col items-start justify-between gap-4 mt-10">
              <div className="text-sm">
                <Link href="/auth/forgot-password">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
              <div className="text-sm">
                <Link href="/auth/register">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Register
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
