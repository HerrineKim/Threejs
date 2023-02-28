WebGL, Shaders, Vertex Shader, Fragment Shader, GLSL ES, and WebGPU In A Nutshell

# OpenGL

애플리케이션이 모니터에 렌더링하기 위하여 그래픽카드와 소통하게 해주는 API



# WebGL

OpenGL ES라고도 불리며, OpenGL의 가벼운 버전이다. JavaScript 애플리케이션과 그래픽 카드 사이에서 3D 물체들을 웹페이지에 띄워 주는 역할을 하는 JS 함수 그 이상도 이하도 아니다. 2011년 3월 전까지 웹 브라우저들은 OpenGL을 실행할 수 없었다. 



# Shaders

WebGL을 통해서 전송하는 요소들(script 태그, string 형태)이다.

## 1. vertex shader

webGL을 통해 GPU로 보내지는 점들이다. 점(들)의 위치나 모양을 결정하는 역할을 한다.

## 2. fragament shader

색깔을 결정한다.



# GLSL ES

C와 유사한 언어다. vertex나 fragment shader를 입력하기 위해 필요하다.



# 3D libraries

3D 라이브러리들은 실제 프로그램과 webGL API 사이에서 코드를 간단하게 하기 위해 사용되는 것이다.(three.js 등)



# Web GPU

아직 출시되지는 않았지만, (2021년 기준 한정) 복잡한 3D 화면을 렌더링하는 데 혁신적인 역할을 할 것이다



실제 API들을 배우는 것은 필수는 아니다. 프론트엔드 개발자로서 우리는 주로 three.js와 같은 라이브러리를 잘 다루는 것이 