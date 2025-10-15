# Sample Python code for testing
def calculate_total(items):
    total = 0
    for item in items:
        total = total + item['price'] * item['quantity']
    return total

def process_order(order_data):
    items = order_data['items']
    customer = order_data['customer']
    
    # Calculate total
    total = calculate_total(items)
    
    # Apply discount
    if customer['is_premium']:
        total = total * 0.9
    
    # Add tax
    total = total * 1.08
    
    return {
        'total': total,
        'customer_id': customer['id'],
        'items_count': len(items)
    }