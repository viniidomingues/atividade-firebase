import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Botao from './botao';

describe('Botao', () => {
  it('deve renderizar corretamente', () => {
    const { getByTestId } = render(<Botao onPress={() => {}} />);

    expect(getByTestId('teste-botao')).toBeTruthy();
  });

  it('deve chamar onPress quando pressionado', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Botao onPress={onPressMock} />);

    fireEvent.press(getByTestId('teste-botao'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
