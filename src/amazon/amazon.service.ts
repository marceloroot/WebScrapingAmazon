import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
@Injectable()
export class AmazonService {
  
    async getProductsQouteScrap(){
        const browser = await puppeteer.launch({
            headless:true,
            slowMo: 200,
            args: ['--no-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto('https://quotes.toscrape.com/');
        await page.click('a[href="/login"]')
        await new Promise(r=> setTimeout(r,1000));
        const userNameInput = await page.$('#username')
        const passwordInput = await page.$('#password')
        const buttonLogin = await page.$('input[type="submit"]')   
        await new Promise(r=> setTimeout(r,1000));
         if(userNameInput && passwordInput){
            await userNameInput.type('marcelo@gmail.com')
            await passwordInput.type('21872187')
            await buttonLogin.click()
            await new Promise(r=> setTimeout(r,1000));
      
            const result = await page.evaluate(() =>{
                const quotes = document.querySelectorAll('.quote')
                const data =[...quotes].map((quote)=>{
                   const quotText=  quote.querySelector('.text').innerHTML;
                   const author=  quote.querySelector('.author').innerHTML;
                   const tagsNode=  quote.querySelectorAll('.tag');
                   const tags = [...tagsNode].map((tag)=>tag.innerHTML)
                   return{
                    text:quotText,
                    author,
                    tags
                   }
                })
                return data;
            })
            console.log(result);
         }
        

        await browser.close();
    }
    async getProducts(){
        try{
              const browser = await puppeteer.launch({
                headless:true,
                slowMo:200,
                args:['--no-sandbox']
              })

              const page = await browser.newPage();
              await page.goto('https://www.amazon.com.br/')
          
              const inputSearch = await page.$('#twotabsearchtextbox')
              const btnSearch = await page.$('#nav-search-submit-button')

              await inputSearch.type('sapato')
              await btnSearch.click()

              console.log(inputSearch)

              
              await new Promise(r=> setTimeout(r,3000));

              const result = await page.evaluate(() =>{
                const divResultNodeList = document.querySelectorAll('.a-section.a-spacing-base.a-text-center')
                const data = [...divResultNodeList].map(res=>{
                   // a-size-base-plus a-color-base a-text-normal
                   const text = res.querySelector('.a-size-base-plus.a-color-base.a-text-normal').innerHTML;
                   const priceNodeList = res.querySelectorAll('.a-offscreen');
                   const price = [...priceNodeList].map(item => item.innerHTML)

                   return {
                    text:text,
                    price:price

                   }
                })
                return data
              })
              console.log(result)
              await browser.close();
              return result

             
        }catch(error){
            return {error:error}
        }
    }

}
