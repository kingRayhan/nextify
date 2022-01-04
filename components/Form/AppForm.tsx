import { Formik } from "formik";

const AppForm = ({
  initialValues,
  onSubmit,
  children,
  validationSchema,
  debug = false,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, touched }) => (
        <>
          {debug && (
            <pre>{JSON.stringify({ values, errors, touched }, null, 2)}</pre>
          )}
          <form onSubmit={handleSubmit} className="space-y-6 ">
            {children}
          </form>
        </>
      )}
    </Formik>
  );
};

export default AppForm;
