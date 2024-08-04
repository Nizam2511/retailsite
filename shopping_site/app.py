from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Ensure the database exists
if not os.path.exists('database.db'):
    conn = sqlite3.connect('database.db')
    conn.execute('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)')
    conn.execute('INSERT INTO products (name, price) VALUES ("Product 1", 10.0)')
    conn.execute('INSERT INTO products (name, price) VALUES ("Product 2", 15.0)')
    conn.execute('INSERT INTO products (name, price) VALUES ("Product 3", 20.0)')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    conn = sqlite3.connect('database.db')
    cursor = conn.execute('SELECT id, name, price FROM products')
    products = cursor.fetchall()
    conn.close()
    return render_template('index.html', products=products)

@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    if 'cart' not in session:
        session['cart'] = []
    session['cart'].append(product_id)
    return redirect(url_for('index'))

@app.route('/checkout')
def checkout():
    if 'cart' not in session or not session['cart']:
        return redirect(url_for('index'))

    conn = sqlite3.connect('database.db')
    cursor = conn.execute('SELECT id, name, price FROM products WHERE id IN ({})'.format(','.join('?' * len(session['cart']))), session['cart'])
    products = cursor.fetchall()
    total = sum(item[2] for item in products)
    conn.close()
    return render_template('checkout.html', products=products, total=total)

@app.route('/complete', methods=['POST'])
def complete():
    if 'cart' in session:
        conn = sqlite3.connect('database.db')
        cursor = conn.execute('SELECT id, name, price FROM products WHERE id IN ({})'.format(','.join('?' * len(session['cart']))), session['cart'])
        products = cursor.fetchall()
        total = sum(item[2] for item in products)
        
        # Save order details to a file on your laptop
        with open('orders.txt', 'a') as f:
            f.write(f"Order: {products}, Total: {total}\n")
        
        session.pop('cart', None)
        conn.close()
    return render_template('success.html')

if __name__ == '__main__':
    app.run(debug=True)
