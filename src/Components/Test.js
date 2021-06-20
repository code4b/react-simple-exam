import React, { useState, useEffect } from 'react';
import Util from "../util/util"
import { Container, Row, Col, Form } from "react-bootstrap";
import '../styles/test.css';
export default function Test({ category }) {


    const [questions = [], setQuestions] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(localStorage.getItem("score"));
    const [score, setScore] = useState(0);
    const [note, setNote] = useState("");
    useEffect(() => {
        const quiz = Util.getQuizByCat(category)
        setQuestions(quiz);
        localStorage.setItem("quiz", JSON.stringify(quiz))
    }, [])


    const handleAnswerOptionClick = (optionId) => {
        if (questions[currentQuestion].correct_option == optionId) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            localStorage.setItem("score", true)
            setShowScore(true);
        }
    };

    return (
        <div className='test'>

            {showScore ? (
                <Container>
                    <Row>
                        <Col sm={12} md={8} >
                            <div className='testBody'>
                                <div className='score-section'>
                                    You scored {score} out of {questions.length}

                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={4} >
                            <div className="notes">{note}</div>

                        </Col>
                    </Row>
                </Container>

            ) : (
                <>
                    {questions && questions.length > 0 &&
                        <>
                            <Container>
                                <Row>
                                    <Col sm={12} md={12} lg={6}>
                                        <div className='testBody'>
                                            <div className='question-section'>
                                                <div className='question-count'>
                                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                                </div>
                                                <div className='question-text'>{questions[currentQuestion].question}</div>
                                            </div>
                                            <div className='answer-section'>
                                                {questions[currentQuestion].options.map((answerOption) => (
                                                    <button key={answerOption.id} onClick={() => handleAnswerOptionClick(answerOption.id)}>{answerOption.value}</button>
                                                ))}
                                            </div>
                                        </div>

                                    </Col>
                                    <Col sm={12} md={12} lg={6} className="formBg align-items-center" >
                                        <Form>


                                            <Form.Group controlId="notes">
                                                <Form.Label>Notepad</Form.Label>
                                                <Form.Control as="textarea" rows={3} name="notes" placeholder="Notes" onChange={(e) => setNote(e.target.value)} />
                                            </Form.Group>

                                        </Form>


                                    </Col>
                                </Row>
                            </Container>




                        </>
                    }

                </>
            )}
        </div>


    );
}
