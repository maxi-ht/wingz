import { badgeSvg } from '../../node_modules/@coinbase/onchainkit/src/internal/svg/badgeSvg';
import { background, cn } from '../../node_modules/@coinbase/onchainkit/src/styles/theme';
import type { BadgeReact } from '../../node_modules/@coinbase/onchainkit/src/identity/types';

/**
 * Badge component.
 */
export function Badge({ className }: BadgeReact) {
  // TODO: Implement the Badge component as span and CSS without an SVG element.
  const badgeSize = '12px';
  return (
    <span
      className={cn(
        background.primary,
        'rounded-full border border-transparent',
        className,
      )}
      data-testid="ockBadge"
      style={{
        height: badgeSize,
        width: badgeSize,
        maxHeight: badgeSize,
        maxWidth: badgeSize,
      }}
    >
      {badgeSvg}
    </span>
  );
}
