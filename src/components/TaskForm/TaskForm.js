import { Field, Formik } from 'formik';
import {
  Label,
  StyledForm,
  Input,
  SubmitBtn,
  ErrorMsg,
  StyledSelect,
} from './TaskForm.styled';
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

export const TaskForm = ({
  onAdd,
  listId,
  onCloseModal,
  isModal = false,
  boards,
}) => {
  return (
    <>
      <Formik
        initialValues={{
          taskTitle: '',
          description: '',
          deadline: '',
          priority: 'low',
        }}
        validationSchema={taskSchema}
        onSubmit={(values, actions) => {
          if (isModal) {
            onAdd(values, listId);
            onCloseModal();
          } else {
            const selectedBoardId = boards.find(
              board => board.title === values.selectedBoard
            )?._id;
            const { selectedBoard, ...taskData } = values;
            onAdd(taskData, selectedBoardId);
          }
          actions.resetForm();
        }}
      >
        {({ values, handleChange }) => (
          <StyledForm>
            <Label>
              Task name:
              <Input
                name="taskTitle"
                type="text"
                value={values.taskTitle}
                onChange={handleChange}
              />
              <ErrorMsg name="taskTitle" component="div" />
            </Label>

            <Label>
              Task description:
              <Input
                name="description"
                type="text"
                value={values.description}
                onChange={handleChange}
              />
              <ErrorMsg name="description" component="div" />
            </Label>

            <Label>
              Due date:
              <Input
                name="deadline"
                type="date"
                value={values.deadline}
                onChange={handleChange}
              />
              <ErrorMsg name="deadline" component="div" />
            </Label>
            <Label>
              Priority:
              <Field
                as={StyledSelect}
                name="priority"
                value={values.priority}
                onChange={handleChange}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </Field>
              <ErrorMsg name="priority" component="div" />
            </Label>

            {!isModal && (
              <Label>
                Select board:
                <Field
                  as={StyledSelect}
                  name="selectedBoard"
                  value={values.selectedBoard}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a board
                  </option>
                  {boards.map(board => (
                    <option key={board._id} value={board.title}>
                      {board.title}
                    </option>
                  ))}
                </Field>
                <ErrorMsg name="selectedBoard" component="div" />
              </Label>
            )}

            <SubmitBtn type="submit">Add new card</SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

// import { Field, Formik } from 'formik';
// import {
//   Label,
//   StyledForm,
//   Input,
//   SubmitBtn,
//   ErrorMsg,
//   StyledSelect,
// } from './TaskForm.styled';
// import * as Yup from 'yup';

// const taskSchema = Yup.object().shape({
//   taskTitle: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   description: Yup.string()
//     .min(3, 'Too Short!')
//     .max(100, 'Too Long!')
//     .required('Required'),
//   deadline: Yup.date().required('Required'),
//   priority: Yup.string().oneOf(['low', 'medium', 'high']).required('Required'),
// });

// export const TaskForm = ({ onAdd, listId, onCloseModal }) => {
//   return (
//     <>
//       <Formik
//         initialValues={{
//           taskTitle: '',
//           description: '',
//           deadline: '',
//           priority: 'low',
//         }}
//         validationSchema={taskSchema}
//         onSubmit={(values, actions) => {
//           onAdd(values, listId);
//           actions.resetForm();
//           onCloseModal();
//         }}
//       >
//         <StyledForm>
//           <Label>
//             Task name:
//             <Input name="taskTitle" type="text" />
//             <ErrorMsg name="taskTitle" component="div" />
//           </Label>

//           <Label>
//             Task description:
//             <Input name="description" type="text" />
//             <ErrorMsg name="description" component="div" />
//           </Label>

//           <Label>
//             Due date:
//             <Input name="deadline" type="date" />
//             <ErrorMsg name="deadline" component="div" />
//           </Label>
//           <Label>
//             Priority:
//             <Field as={StyledSelect} name="priority">
//               <option value="low">low</option>
//               <option value="medium">medium</option>
//               <option value="high">high</option>
//             </Field>
//             <ErrorMsg name="priority" component="div" />
//           </Label>
//           <SubmitBtn type="submit">Add new card</SubmitBtn>
//         </StyledForm>
//       </Formik>
//     </>
//   );
// };
