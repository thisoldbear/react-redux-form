export const POST_FORM = 'POST_FORM';

export function postForm(values) {
  console.log(values); /// Will only get here if form is valid
  alert('Form succesfully submitted');
  return {
    type: POST_FORM,
    payload: values,
  };
}
