import { pinyin } from 'pinyin-pro'

console.log(
  pinyin('鹿乃', {
    pattern: 'first',
    type: 'array'
  })
)
