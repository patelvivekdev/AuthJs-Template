import { CSSProperties } from 'react';

type Type = 'circle' | 'ellipse';

type Origin =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

interface RadialProps {
  /**
   * The type of radial gradient
   * @default circle
   * @type string
   */
  type?: Type;
  /**
   * The color to transition from
   * @default #00000000
   * @type string
   * */
  from?: string;

  /**
   * The color to transition to
   * @default #290A5C
   * @type string
   * */
  to?: string;

  /**
   * The width of the ellipse gradient in pixels
   * @default 300
   * @type number
   * */
  width?: number;

  /**
   * The height of the ellipse gradient in pixels
   * @default 300
   * @type number
   * */
  height?: number;

  /**
   * The size of the gradient in pixels
   * @default 300
   * @type number
   * */
  size?: number;

  /**
   * The origin of the gradient
   * @default center
   * @type string
   * */
  origin?: Origin;

  /**
   * The class name to apply to the gradient
   * @default ""
   * @type string
   * */
  className?: string;
}

const RadialGradient = ({
  type = 'circle',
  from = 'rgba(255, 99, 71, 0.8)',
  to = 'hsla(0, 0%, 0%, 0)',
  size = 300,
  width = 500,
  height = 200,
  origin = 'center',
  className,
}: RadialProps) => {
  const styles: CSSProperties =
    type === 'ellipse'
      ? {
          position: 'absolute',
          pointerEvents: 'none',
          inset: 0,
          backgroundImage: `radial-gradient(${width}px ${height}px at ${origin}, ${from}, ${to})`,
        }
      : {
          position: 'absolute',
          pointerEvents: 'none',
          inset: 0,
          backgroundImage: `radial-gradient(${type} ${size}px at ${origin}, ${from}, ${to})`,
        };

  return <div className={className} style={styles} />;
};

export default RadialGradient;
