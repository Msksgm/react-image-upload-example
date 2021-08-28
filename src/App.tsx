import { FC, useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";

type ThumbProps = {
  file: File | null;
};

const Thumb: FC<ThumbProps> = ({ file }) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [thumb, setThumb] = useState<string>();

  useEffect(() => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumb(reader.result as string);
      };
      setLoading(false);
    }
  }, [file]);

  if (!file) {
    return null;
  }

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <img
      src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
    />
  );
};

const ImageUploader: FC = () => {
  return (
    <Formik
      initialValues={{ file: null }}
      onSubmit={(values: any) => {
        alert(
          JSON.stringify({
            fileName: values.file.name,
            type: values.file.type,
            size: `${values.file.size} bytes`,
          })
        );
      }}
      validationSchema={yup.object().shape({
        file: yup.mixed().required(),
      })}
    >
      {({ handleSubmit, setFieldValue, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="file">File upload</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(event) => {
                  setFieldValue(
                    "file",
                    event.currentTarget.files !== null
                      ? event.currentTarget.files[0]
                      : null
                  );
                }}
                className="form-control"
              />
              <Thumb file={values.file} />
            </div>
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

const App = () => {
  return (
    <div className="container">
      <ImageUploader />
    </div>
  );
};

export default App;
