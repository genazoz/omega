import React, {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import clx from "classnames";
import {useFormContext} from "react-hook-form";
import theme from "../../theme";
import {InputStyles} from "../../globalStyles";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0 0 0;

  &:nth-child(1) {
    margin: 0;
  }
`;
const Input = styled(InputStyles)`
`;
const FileLabel = styled.label`  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  margin: 0;
  padding: 10px;

  font-family: ${theme.fonts.dinCondM};
  font-size: 15px;
  color: #2c2b42;

  background: #ff7dd1;
  border: unset;
  border-radius: 15px;
  box-shadow: 0 5px 0px 0px #3c2c31;
`
const Placeholder = styled.div`
  display: flex;
  height: max-content;
  margin: auto 12px 3px 12px;
  padding: 0;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};

  pointer-events: none;

  input:hover ~ &,
  input:focus ~ & {
    color: rgba(255, 255, 255, .4);
  }

  .is-error &,
  .is-error input:hover ~ &,
  .is-error input:focus ~ & {
    color: #FFFFFF;
  }
`;

interface FormFieldProps {
  name: string,
  required: boolean,
  type: string,
  placeholder: string,
  icon: string,
  accept?: string
}

export const FormField: React.FC<FormFieldProps> = ({name, required = false, type, placeholder, icon, accept = ''}) => {
  const [value, setLocalValue] = useState('');
  const [fileValue, setFileValue] = useState('');
  const {register, formState: {errors}, setValue} = useFormContext();
  const errorMessage: string | false = errors[name]?.message as string || false;

  const handleInputFileChange = (e: FormEvent<HTMLLabelElement>) => {
    const target = e.target as HTMLInputElement;

    if(!target.files)
      return;

    const imageName = target.files[0]?.name;

    if(imageName)
      setFileValue(imageName)
  };

  return (
    <Wrapper className={clx([(!!errorMessage && value) && 'is-error', (!errorMessage && value) && 'is-success'])}>
      {
        type !== 'file' ?
          <>
            <Placeholder>{(!!errorMessage && value) && errorMessage || placeholder}{required && '*'}</Placeholder>
            <Input {...register(name, {required: required})}
                   value={value}
                   type={type}
                   placeholder=" "
                   onChange={(e) => {
                     const value = e.target.value;
                     setLocalValue(value);
                     setValue(name, value, {shouldValidate: true})
                   }}/>
          </>
          : <>
              <Placeholder>{(!!errorMessage && value) && errorMessage || placeholder}{required && '*'}</Placeholder>
              <FileLabel htmlFor="upload-input" onChange={(e) => handleInputFileChange(e)}>
                {fileValue || `Выберите картинку`}
                <Input {...register(name, {required: required})}
                       id={'upload-input'}
                       type={type}
                       accept={accept}
                       placeholder=" "
                       hidden
                />
              </FileLabel>
            </>
      }
    </Wrapper>
  );
}
