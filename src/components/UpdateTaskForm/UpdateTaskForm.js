import { Field, Formik } from 'formik';
import {
  Label,
  StyledForm,
  Input,
  SubmitBtn,
  ErrorMsg,
} from '../TaskForm/TaskForm.styled';
import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  taskTitle: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(3, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  deadline: Yup.date().required('Required'),
  priority: Yup.string().oneOf(['low', 'medium', 'high']).required('Required'),
});

export const UpdateTaskForm = ({
  onUpdateCard,
  boardId,
  taskId,
  onCloseModal,
  initialValues,
}) => {
  return (
    <>
      <Formik
        initialValues={{
          taskTitle: initialValues.taskTitle || '',
          description: initialValues.description || '',
          deadline: initialValues.deadline || '',
          priority: initialValues.priority || '',
        }}
        validationSchema={taskSchema}
        onSubmit={(values, actions) => {
          console.log('values=>', values);
          console.log('boardId=>', boardId);
          console.log('taskId=>', taskId);

          onUpdateCard(values, boardId, taskId);
          actions.resetForm();
          onCloseModal();
        }}
      >
        <StyledForm>
          <Label>
            Task name:
            <Input name="taskTitle" type="text" />
            <ErrorMsg name="taskTitle" component="div" />
          </Label>

          <Label>
            Task description:
            <Input name="description" type="text" />
            <ErrorMsg name="description" component="div" />
          </Label>

          <Label>
            Due date:
            <Input name="deadline" type="date" />
            <ErrorMsg name="deadline" component="div" />
          </Label>
          <Label>
            Priority:
            <Field as="select" name="priority">
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </Field>
            <ErrorMsg name="priority" component="div" />
          </Label>
          <SubmitBtn type="submit">Edit card</SubmitBtn>
        </StyledForm>
      </Formik>
    </>
  );
};
