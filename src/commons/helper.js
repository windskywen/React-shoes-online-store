export const formatPrice = cents => (
    (cents / 100).toLocaleString('zh', { style: 'currency', currency: 'AUD'})
)