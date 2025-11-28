#!/usr/bin/env python3
import os
from flask import Flask, request, jsonify, send_file
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from docx import Document
from datetime import datetime
import requests
import io

app = Flask(__name__)

# Paystack API Keys from environment variables
PAYSTACK_SECRET_KEY = os.getenv('PAYSTACK_SECRET_KEY', '238b292d4da31544')
PAYSTACK_PUBLIC_KEY = os.getenv('PAYSTACK_PUBLIC_KEY', 'pk_test_35cd142d3174518a92af53c22e98d20b297c4aca')

# Serve static files
@app.route('/')
def serve_index():
    return send_file('index.html')

@app.route('/<path:path>')
def serve_static(path):
    try:
        return send_file(path)
    except:
        return send_file('index.html')

# Payment processing endpoint
@app.route('/process-payment', methods=['POST'])
def process_payment():
    try:
        data = request.json
        reference = data.get('reference')
        
        # Verify payment with Paystack
        headers = {
            'Authorization': f'Bearer {PAYSTACK_SECRET_KEY}',
            'Content-Type': 'application/json'
        }
        
        response = requests.get(
            f'https://api.paystack.co/transaction/verify/{reference}',
            headers=headers
        )
        
        if response.status_code == 200:
            result = response.json()
            if result['data']['status'] == 'success':
                return jsonify({'success': True, 'message': 'Payment verified successfully'})
        
        return jsonify({'success': False, 'error': 'Payment verification failed'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

# Document generation endpoint
@app.route('/generate-document', methods=['POST'])
def generate_document():
    try:
        data = request.json
        package_type = data.get('packageType')
        work_experience = data.get('work_experience')
        education = data.get('education')
        skills = data.get('skills')
        
        if package_type == 'cv' or package_type == 'both':
            cv_filename = f"cv_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
            generate_cv_pdf(cv_filename, work_experience, education, skills)
        
        if package_type == 'cover' or package_type == 'both':
            letter_filename = f"cover_letter_{datetime.now().strftime('%Y%m%d_%H%M%S')}.docx"
            generate_cover_letter_docx(letter_filename)
        
        return jsonify({'success': True, 'message': 'Documents generated successfully'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

def generate_cv_pdf(filename, work_exp, education, skills):
    doc = SimpleDocTemplate(filename, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor='gold',
        spaceAfter=6,
        alignment=1
    )
    
    story.append(Paragraph("Professional CV", title_style))
    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Work Experience", styles['Heading2']))
    story.append(Paragraph(work_exp, styles['BodyText']))
    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Education", styles['Heading2']))
    story.append(Paragraph(education, styles['BodyText']))
    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Skills", styles['Heading2']))
    story.append(Paragraph(skills, styles['BodyText']))
    
    doc.build(story)

def generate_cover_letter_docx(filename):
    doc = Document()
    doc.add_heading('Professional Cover Letter', 0)
    doc.add_paragraph()
    doc.add_paragraph('Dear Hiring Manager,')
    doc.add_paragraph()
    doc.add_paragraph('I am writing to express my interest in the position. With my professional experience and skills, I am confident in my ability to contribute significantly to your organization.')
    doc.add_paragraph()
    doc.add_paragraph('Throughout my career, I have developed strong expertise and have consistently delivered excellent results. I am excited about the opportunity to bring my skills and experience to your team.')
    doc.add_paragraph()
    doc.add_paragraph('Best regards,')
    doc.add_paragraph()
    doc.add_paragraph('[Your Name]')
    doc.save(filename)

if __name__ == '__main__':
    print(f"Starting Shivakalabs Server with Paystack integration...")
    print(f"Public Key: {PAYSTACK_PUBLIC_KEY[:20]}...")
    app.run(host='0.0.0.0', port=5000, debug=False)
