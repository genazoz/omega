import React, {useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";

import {setShowCreateProductModal, settingsSelector} from "../../features/settings/settingsSlice";
import theme from "../../theme";
import {ClientOnlyPortal} from "../ClientOnlyPortal/index";
import {CSSTransition} from 'react-transition-group';
import {useAppDispatch} from "../../app/store";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateProductSchema} from "../../utils/validations";
import {addNewGoods, goodsSelector} from "../../features/goods/goodsSlice";
import {FormField} from "../FormField";
import {ButtonStyles} from "../../globalStyles";
import {filterSelector} from "../../features/filter/filterSlice";
import {Loader} from "../Loader";
import {toast} from "react-toastify";

const Wrapper = styled.div`
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  &.auth-modal-enter {
    opacity: 0;
  }

  &.auth-modal-enter-active {
    opacity: 1;

    transition: opacity .2s;
  }

  &.auth-modal-exit {
    opacity: 1;
  }

  &.auth-modal-exit-active {
    opacity: 0;
    transition: opacity .2s;
  }
`;
const Container = styled.div<{ isLoading: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 360px;
  max-width: calc(100% - 24px * 2);
  height: max-content;
  max-height: calc(100% - 80px);
  margin: auto;
  transform: translateY(-20%);

  color: black;

  transition: .4s transform, .4s filter;

  .auth-modal-enter & {
  }

  .auth-modal-enter-active & {
    transform: translateY(0%);
  }

  .auth-modal-enter-done & {
    transform: translateY(0%);
  }

  .auth-modal-exit & {
    transform: translateY(20%);
  }

  .auth-modal-exit-active & {
    transform: translateY(20%);
  }

  @media (max-width: ${theme.media.mob}) {
    max-height: calc(100% - 30px);
    padding: 40px 35px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    padding: 25px 20px;
  }

  ${props => props.isLoading && `
    pointer-events: none;
    filter: brightness(50%);
  `}
`;
const FormWrapper = styled.span`
  padding: 30px;

  border-radius: 15px;
  border: none;
  background: #d861ae;
  box-shadow: 0 5px 0px 0px #3c2c31;
`
const Overflow = styled.div`
  width: 100%;
  height: 100%;

  cursor: pointer;

  transition: 0.7s background-color;
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);

  background: rgba(0, 0, 0, 0.9);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Button = styled(ButtonStyles)<{ isDisabled: boolean }>`
  width: 100%;
  margin: 30px 0 0;

  ${props => props.isDisabled && `
    color: #e26eb9;
  
    background: transparent;
    border: 2px solid #e26eb9;
    box-shadow: unset;
    pointer-events: none;
    opacity: .3;
  `}
`
const Title = styled.span`
  margin: 0 0 10px 0;

  color: ${theme.colors.pink};
  font-size: 40px;
`

interface CreateProductProps {
  selector: string
}

const CreateProductModal: React.FC<CreateProductProps> = ({selector}) => {
  const {showCreateProductModal} = useSelector(settingsSelector);
  const dispatch = useAppDispatch();
  const {currentPage, searchQuery} = useSelector(filterSelector)
  const {goodsPerPage} = useSelector(settingsSelector)
  const {addingStatus} = useSelector(goodsSelector)
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(CreateProductSchema),
  });

  useEffect(() => {
    if (addingStatus === 'success') {
      dispatch(setShowCreateProductModal(false))
    }
  }, [addingStatus])

  const onSubmit = async (data: any) => {
    const imageData = data.image[0];

    if (!imageData)
      return;

    const formData = new FormData();
    formData.append("file", imageData)
    formData.append("upload_preset", "yyw6rt99");
    formData.append('cloud_name', 'genazoz-cloud');

    const {title, price, description} = data;
    const addGoodsParams = {title, price, description, formData, currentPage, searchQuery, goodsPerPage};

    const {payload} = await dispatch(addNewGoods(addGoodsParams))

    switch(payload) {
      case 'success':
        toast.success("Товар добавлен успешно!");
      break;
      default:
        toast.error(`Ошибка: ${payload}`);
      break;
    }
  };

  const onClickShowAuthButton = () => {
    dispatch(setShowCreateProductModal(!showCreateProductModal));
  };

  return (
    <ClientOnlyPortal selector={selector}>
      <CSSTransition in={showCreateProductModal} classNames={'auth-modal'} timeout={200} unmountOnExit>
        <Wrapper>
          <Overflow onClick={onClickShowAuthButton}/>
          {addingStatus === 'loading' && <Loader/>}
          <Container isLoading={addingStatus === 'loading'}>
            <Title>
              Новый товар
            </Title>
            <FormProvider {...form}>
              <Form onSubmit={
                form.handleSubmit(onSubmit)
              }>
                <FormWrapper>
                  <FormField
                    name={'title'}
                    required={true}
                    type="text"
                    placeholder="Название"
                    icon="far fa-at"></FormField>
                  <FormField
                    name={'price'}
                    required={true}
                    type="number"
                    placeholder="Цена"
                    icon="far fa-lock-alt"></FormField>
                  <FormField
                    name={'description'}
                    required={false}
                    type="text"
                    placeholder="Описание"
                    icon="far fa-lock-alt"></FormField>
                  <FormField
                    name={'image'}
                    required={true}
                    type="file"
                    accept={'.png, .jpg, .jpeg'}
                    placeholder="Картинка"
                    icon="far fa-lock-alt"></FormField>
                </FormWrapper>
                <Button type='submit' isDisabled={!form.formState.isValid || form.formState.isSubmitting}>
                  Создать
                </Button>
              </Form>
            </FormProvider>
          </Container>
        </Wrapper>
      </CSSTransition>
    </ClientOnlyPortal>
  )
}

export default CreateProductModal;