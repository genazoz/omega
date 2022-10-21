import * as yup from "yup";

export const CreateProductSchema = yup.object({
  title: yup.string().min(2, 'Название не короче 2-х символов').required('Название обязательно'),
  price: yup.number().required('Цена обязательна'),
  image: yup.mixed().required('Картинка обязательна')
    .test('fileFormat', 'Img only', (value) => {
      if(!value) {
        return;
      }

      const type = value[0]?.type;
      return type && ['image/jpeg', 'image/png'].includes(type);
    }),
  description: yup.string(),
});
