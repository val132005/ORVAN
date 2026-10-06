import { UI_MESSAGES } from '../../config/site.js';
import { useToast } from '../../context/toast/useToast.js';
import { cx } from '../../utils/classNames.js';
import { getContactLink } from '../../utils/contact.js';
import Icon from '../ui/Icon.jsx';

const DEFAULT_LABELS = { whatsapp: 'Pedir por WhatsApp', email: 'Pedir por correo' };
const CHANNEL_NAMES = { whatsapp: 'WhatsApp', email: 'correo' };

/**
 * Pide un producto por WhatsApp (o solicita información general si no recibe `product`).
 * El número y el mensaje salen de src/config/whatsapp.js. Si no hay número configurado
 * usa el correo y, si tampoco existe, muestra un aviso.
 *
 * variant="icon" → solo el icono (tarjetas) · variant="button" → botón principal.
 */
export default function WhatsAppButton({ product = null, variant = 'button', className, children }) {
  const { showToast } = useToast();
  const isSoldOut = Boolean(product && !product.available);
  const link = isSoldOut ? null : getContactLink(product);
  const channel = link?.channel ?? 'whatsapp';
  const isIcon = variant === 'icon';

  const classes = cx(isIcon ? 'icon-btn' : 'btn btn--primary', className);
  const icon = <Icon name={channel === 'email' ? 'mail' : 'whatsapp'} />;
  const label = isSoldOut ? 'Agotado' : (children ?? DEFAULT_LABELS[channel]);
  const content = isIcon ? icon : <>{icon}{label}</>;

  let ariaLabel;
  if (isIcon && product) {
    ariaLabel = isSoldOut ? `${product.name}: agotado` : `Pedir ${product.name} por ${CHANNEL_NAMES[channel]}`;
  }

  if (link) {
    const opensNewTab = link.channel === 'whatsapp';
    return (
      <a
        className={classes}
        href={link.href}
        target={opensNewTab ? '_blank' : undefined}
        rel={opensNewTab ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type="button"
      aria-label={ariaLabel}
      disabled={isSoldOut}
      onClick={() => showToast(UI_MESSAGES.contactUnavailable)}
    >
      {content}
    </button>
  );
}
