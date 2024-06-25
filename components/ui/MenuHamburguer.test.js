import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MenuHamburguer from './MenuHamburguer';
import { ThemeProviderContext } from '../../app/contexts/ThemeContext';

describe('MenuHamburguer', () => {
  it('deve renderizar corretamente', () => {
    const { getByTestId } = render(
      <ThemeProviderContext>
        <MenuHamburguer onPress={() => {}} />
      </ThemeProviderContext>
    );

    expect(getByTestId('teste-menu')).toBeTruthy();
  });

  it('deve chamar onPress quando pressionado', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProviderContext>
        <MenuHamburguer onPress={onPressMock} />
      </ThemeProviderContext>
    );

    fireEvent.press(getByTestId('teste-menu'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
