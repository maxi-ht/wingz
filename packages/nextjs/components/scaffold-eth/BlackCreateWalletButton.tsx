import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { CoinbaseWalletLogo } from './RainbowKitCustomConnectButton/CoinbaseWalletLogo';

const GRADIENT_BORDER_WIDTH = 2;

const buttonStyles = {
  background: 'transparent',
  border: '1px solid transparent',
  boxSizing: 'border-box',
};

const contentWrapperStyle = {
  position: 'relative',
};

// Hook para determinar si está en modo claro o oscuro
const useTheme = () => {
  const [isLightMode, setIsLightMode] = useState(false); // Cambia a true para el modo claro
  // Aquí puedes agregar lógica para cambiar entre modos, por ejemplo, basado en un botón o un evento.
  return { isLightMode, setIsLightMode };
};

function Gradient({ children, style, isAnimationDisabled = false }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientStyle = useMemo(() => {
    const rotate = isAnimating ? '720deg' : '0deg';
    return {
      transform: `rotate(${rotate})`,
      transition: isAnimating
        ? 'transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)'
        : 'none',
      ...style,
    };
  }, [isAnimating, style]);

  const handleMouseEnter = useCallback(() => {
    if (isAnimationDisabled || isAnimating) return;
    setIsAnimating(true);
  }, [isAnimationDisabled, isAnimating, setIsAnimating]);

  useEffect(() => {
    if (!isAnimating) return;
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [isAnimating]);

  return (
    <div style={contentWrapperStyle} onMouseEnter={handleMouseEnter}>
      <div className="gradient-background" style={gradientStyle} />
      {children}
    </div>
  );
}

export function BlackCreateWalletButton({ height = 35, width = 140 }) {
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount(); // hook para saber si está conectado
  const { isLightMode } = useTheme(); // Obtener el modo del tema

  const minButtonHeight = 35;
  const minButtonWidth = 140;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);

  const styles = useMemo(() => {
    return {
      gradientContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isLightMode ? '#FFFFFF' : '#000000', // Fondo blanco en modo claro
        borderRadius: buttonHeight / 2,
        height: buttonHeight,
        width: buttonWidth,
        boxSizing: 'border-box',
        overflow: 'hidden',
      },
      gradient: {
        background: isLightMode
          ? 'conic-gradient(from 180deg, #0052FF 0deg, #45E1E5 86.4deg, #FF9533 165.6deg, #7FD057 255.6deg, #B82EA4 320.4deg, #0052FF 360deg)' // Gradiente para modo claro
          : 'conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)', // Gradiente original para modo oscuro
        position: 'absolute',
        top: -buttonHeight - GRADIENT_BORDER_WIDTH,
        left: -GRADIENT_BORDER_WIDTH,
        width: gradientDiameter,
        height: gradientDiameter,
      },
      buttonBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        backgroundColor: isLightMode ? '#FFFFFF' : '#000000', // Fondo blanco en modo claro
        height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
        width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'normal',
        fontSize: 14,
        borderRadius: buttonHeight / 2,
        position: 'relative',
        paddingRight: 10,
        color: isLightMode ? '#000000' : '#FFFFFF', // Texto negro en modo claro
      },
    };
  }, [buttonHeight, buttonWidth, gradientDiameter, isLightMode]);

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK'
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  // Si está conectado, no se renderiza el botón
  if (isConnected) {
    return null;
  }

  return (
    <button style={buttonStyles} onClick={createWallet}>
      <div style={styles.gradientContainer}>
        <Gradient style={styles.gradient}>
          <div style={styles.buttonBody}>
            <CoinbaseWalletLogo containerStyles={{ paddingRight: 10 }} />
            Create Wallet
          </div>
        </Gradient>
      </div>
    </button>
  );
}
