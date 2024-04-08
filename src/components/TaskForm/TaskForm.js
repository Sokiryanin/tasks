import { Formik } from 'formik';
import {
  Label,
  StyledForm,
  Input,
  SubmitBtn,
  ErrorMsg,
} from './TaskForm.styled';
import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(3, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  date: Yup.date().required('Required'),
  level: Yup.string().oneOf(['low', 'medium', 'high']).required('Required'),
});

export const TaskForm = ({ onAdd }) => {
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          description: '',
          date: '',
          level: 'low',
        }}
        validationSchema={taskSchema}
        onSubmit={(values, actions) => {
          onAdd(values);
          actions.resetForm();
        }}
      >
        <StyledForm>
          <Label>
            Task name:
            <Input name="name" type="text" />
            <ErrorMsg name="name" component="div" />
          </Label>

          <Label>
            Task description:
            <Input name="description" type="text" />
            <ErrorMsg name="description" component="div" />
          </Label>

          <Label>
            Due date:
            <Input name="date" type="date" />
            <ErrorMsg name="date" component="div" />
          </Label>
          <Label>
            Priority:
            <Input as="select" name="level">
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </Input>
            <ErrorMsg name="level" component="div" />
          </Label>
          <SubmitBtn type="submit">Submit</SubmitBtn>
        </StyledForm>
      </Formik>
    </>
  );
};
