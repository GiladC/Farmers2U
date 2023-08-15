import React, { useState } from 'react';
import styles from './FAQ.module.css'; // Import the CSS module


function FAQ () {
    const [faqs, setFaqs] = useState([
        {
            question: ' האם כדאי האם כדאי האם כדאי האם כדאי האם כדאי האם כדאי האם כ ג ג כדאי האם כדאי האם כדאי האם כדאי האם כדאי האם כדאי',
            answer: ' האם כדאי האם כדאי האם כדאי האם כדאי האם כדאי האם כדאי האם כ ג ג כדאי האם כדאי כ כ כ האם כדאי האם כדאי האם כדאי האם כדאי',
            open: false
        },
        {
            question: 'שאלה',
            answer: 'תשובה',
            open: false
        },
        {
            question: 'שאלה',
            answer: 'תשובה',
            open: false
        },
        {
            question: 'שאלה',
            answer: 'תשובה',
            open: false
        },
        {
            question: 'שאלה',
            answer: 'תשובה',
            open: false
        },
        {
            question: 'שאלה',
            answer: 'תשובה',
            open: false
        },
        {
            question: 'שאלה',
            answer: 'תשובה',
            open: false
        },
        {
            question: 'שאלה',
            answer: 'תשובה',
            open: false
        }
    ]);

    const toggleFAQ = index => {
        setFaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open
            } else {
                faq.open = false;
            }
            return faq;
        }))
    }

    return (
        <div dir="rtl" className={styles.faqs}>
            {faqs.map((faq, i) => (
                <FAQItem faq={faq} index={i} toggleFAQ={toggleFAQ} key={i} />
            ))}
        </div>
    );
}

function FAQItem({ faq, index, toggleFAQ }) {
    return (
        <div
            className={`${styles['faq']} ${faq.open ? styles['open'] : ''}`}
            onClick={() => toggleFAQ(index)}
        >
            <div className={styles['faq-question']}>
                {faq.question}
            </div>
            <div className={styles['faq-answer']}>
                {faq.answer}
            </div>
        </div>
    )
}

export default FAQ;