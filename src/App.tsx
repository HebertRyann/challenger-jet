import React from 'react';
import { useState } from 'react';
import { api } from './service/api';
import { Container, 
  ContainerList, 
  ContainerOperator, 
  ContainerButtons, 
  ContainerClient, 
  WrapperClients,
  ContainerHeaderClient,
  ContainerFooterClient, 
  LoadingModal,
} from './styles';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useEffect } from 'react';
import { CSVLink } from 'react-csv';

interface Operator {
  name: string;
}
interface Distributions {
  id: string;
  operator: string;
  client: string;
}

const App: React.FC = () => {
  const [operator, setOperator] = useState('');
  const [updateOperator, setUpdateOperator] = useState('');
  const [allOperators, setAllOperators] = useState<Operator[]>([]);
  const [allDistributions, setAllDistributions] = useState<Distributions[]>([]);
  
  let timer: NodeJS.Timeout;

  async function loadResouces(){
    api.get('distribution').then(response => 
      api.get('distribution/list').then(response => {
        if(response.data.length > 5) {
          setAllDistributions(response.data);
          clearInterval(timer)
        }
        if(allOperators.length === 0){
          clearInterval(timer)
        }
        
      })
    )
  }
  async function loadOperators(){
    api.get('operator').then(response => {
      
      setAllOperators(response.data);
      clearInterval(timer);
    })
  }
          
  function handleUpload(file: HTMLInputElement) {
    if(file.files){
      const data = new FormData();
      data.append('file', file.files[0]);
      if(file.files)
      try {
        api.post('/clients', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        alert('Arquivo enviado com sucesso')
      } catch (error) {
        alert('Falha ao enviar o arquivo')
      }
    }
  }
  async function handleAddOperator() {
    const response = await api.post('/operator', {
      name: operator,
    });
    setAllOperators([...allOperators, response.data]);
    setUpdateOperator('');
    timer = setInterval(() => {
      
      loadResouces();
    },1000);
  }

  async function handleUpdate(name: string) {
    await api.put('/operator', {
      name,
      modification: updateOperator
    });
    setUpdateOperator('');
    api('/distribution/list').then(response => {
      setAllDistributions(response.data);
      timer = setInterval(() => {
        loadOperators();
        loadResouces();
      },1000);
    })
  }
  async function handleDelete(name: string) {
    await api.delete(`operator/${name}`);
    api.get('/operator').then(response => {
      setAllOperators(response.data);
      timer = setInterval(() => {
        loadResouces();
        loadResouces();
      },1000);
    })
  }

  return (
    <Container>
      <h1>List Clients CSV</h1>
      {true && (
        <input 
        type="text" 
        placeholder="Digite o nome do operador"           
        className="InputOperator"
        value={operator}
        onChange={(event) => setOperator(event?.target.value)} 
        />
      )}
      <ContainerButtons>
        <button onClick={handleAddOperator}>
          Adicionar
        </button>
        <div className="file-input">
          <input type="file" id="file" className="file" onChange={(event) => handleUpload(event.target)}/>
          <label htmlFor="file" >Escolha o arquivo</label>
        </div>
        <a href="http://localhost:3333/distribution/export">
          Baixe CSV
        </a>
      </ContainerButtons>

      <ContainerList>
        {allOperators.map(operator => (
          <ContainerOperator key={operator.name}>
          <div className="ContentHead">
            <strong>{operator.name}</strong>
            <input 
              type="text" 
              className="InputEditOperator" 
              onChange={(event) => setUpdateOperator(event?.target.value)}
            />
            <div className="IconsHead">
              <FiEdit size={24} color="#fff" onClick={()=>handleUpdate(operator.name)}/>
              <RiDeleteBinLine size={24} color="#FFF" onClick={()=>handleDelete(operator.name.split(' ')[1])}/>
            </div>
          </div>
          <WrapperClients>
            {allDistributions.map(distribution => distribution.operator === operator.name &&(
              <ContainerClient key={distribution.id}>
              <ContainerHeaderClient>
                <div className="ContainerName">
                  <span>Nome:</span>
                  <p>{distribution.client}</p>
                </div>
                <div className="ContainerBirth">
                  <span>Nascimento: </span>
                  <p>{Number(distribution.client.split(' ')[1]) * 30 / 2}/{Number(distribution.client.split(' ')[1]) * 12 / 2}/19{Number(distribution.client.split(' ')[1]) * 10 }</p>
                </div>
              </ContainerHeaderClient>
              
              <ContainerFooterClient>
                <div className="value">
                  <span>Valor:</span>
                  <p>{Number(distribution.client.split(' ')[1]) * 100 / 2 * 0.13}</p>
                </div>
                <div className="Email">
                  <span>Email:</span>
                  <p>Cliente{distribution.client.split(' ')[1]}@teste.com</p>
                </div>
              </ContainerFooterClient>
            </ContainerClient>
            ))}
          </WrapperClients>
        </ContainerOperator>
        ))}
      </ContainerList>
    </Container>
  )
};

export default App;
