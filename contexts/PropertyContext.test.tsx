import { renderHook, act } from '@testing-library/react';
import { PropertyProvider, usePropertyContext } from './PropertyContext';
import { generateVtexSchema } from '@/utils/schemaGenerator';

// Wrapper para o Provider
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PropertyProvider>{children}</PropertyProvider>
);

describe('PropertyContext - Testes Completos', () => {
  describe('Adicionar propriedades', () => {
    it('deve adicionar uma propriedade no nível raiz', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
      });

      expect(result.current.properties).toHaveLength(1);
      expect(result.current.properties[0]).toMatchObject({
        name: '',
        type: 'string',
        title: '',
        required: false,
      });
    });

    it('deve adicionar múltiplas propriedades no nível raiz', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
        result.current.addProperty(null);
        result.current.addProperty(null);
      });

      expect(result.current.properties).toHaveLength(3);
    });
  });

  describe('Propriedades do tipo Array', () => {
    it('deve adicionar filho a uma propriedade do tipo array', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      // Adicionar propriedade raiz
      act(() => {
        result.current.addProperty(null);
      });

      // Atualizar para tipo array
      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          type: 'array',
          arrayItemProperties: [],
        });
      });

      // Adicionar filho ao array
      act(() => {
        result.current.addProperty(['0']);
      });

      const arrayProp = result.current.properties[0];
      expect(arrayProp.type).toBe('array');
      expect(arrayProp.arrayItemProperties).toHaveLength(1);
      expect(arrayProp.arrayItemProperties?.[0]).toMatchObject({
        name: '',
        type: 'string',
        title: '',
      });
    });

    it('deve adicionar múltiplos filhos a um array', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          type: 'array',
          arrayItemProperties: [],
        });
      });

      act(() => {
        result.current.addProperty(['0']);
        result.current.addProperty(['0']);
        result.current.addProperty(['0']);
      });

      const arrayProp = result.current.properties[0];
      expect(arrayProp.arrayItemProperties).toHaveLength(3);
    });
  });

  describe('Propriedades do tipo Object', () => {
    it('deve adicionar filho a uma propriedade do tipo object', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          type: 'object',
          objectProperties: [],
        });
      });

      act(() => {
        result.current.addProperty(['0']);
      });

      const objectProp = result.current.properties[0];
      expect(objectProp.type).toBe('object');
      expect(objectProp.objectProperties).toHaveLength(1);
      expect(objectProp.objectProperties?.[0]).toMatchObject({
        name: '',
        type: 'string',
        title: '',
      });
    });
  });

  describe('Propriedades do tipo Conditional', () => {
    it('TESTE DE NAVEGAÇÃO: deve adicionar filho ao campo conditional via botão "+"', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      // PASSO 1: Usuário adiciona uma propriedade raiz
      console.log('PASSO 1: Adicionar propriedade raiz');
      act(() => {
        result.current.addProperty(null);
      });
      console.log('Estado após adicionar raiz:', JSON.stringify(result.current.properties, null, 2));
      expect(result.current.properties).toHaveLength(1);

      // PASSO 2: Usuário seleciona tipo "conditional"
      console.log('\nPASSO 2: Alterar tipo para conditional');
      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          type: 'conditional',
          conditionalFields: [],
        });
      });
      console.log('Estado após mudar para conditional:', JSON.stringify(result.current.properties, null, 2));
      expect(result.current.properties[0].type).toBe('conditional');
      expect(result.current.properties[0].conditionalFields).toEqual([]);

      // PASSO 3: Usuário clica no botão "+" para adicionar filho
      console.log('\nPASSO 3: Clicar no botão + para adicionar filho');
      console.log('Antes de adicionar filho - conditionalFields:', result.current.properties[0].conditionalFields);
      
      act(() => {
        result.current.addProperty(['0']); // Path para o primeiro item
      });
      
      console.log('Depois de adicionar filho - Estado completo:', JSON.stringify(result.current.properties, null, 2));
      console.log('conditionalFields:', result.current.properties[0].conditionalFields);

      // VERIFICAÇÃO: O filho foi realmente adicionado?
      const conditionalProp = result.current.properties[0];
      console.log('\nVERIFICAÇÃO FINAL:');
      console.log('- Tipo:', conditionalProp.type);
      console.log('- Tem conditionalFields?', !!conditionalProp.conditionalFields);
      console.log('- Quantidade de conditionalFields:', conditionalProp.conditionalFields?.length || 0);
      
      expect(conditionalProp.type).toBe('conditional');
      expect(conditionalProp.conditionalFields).toBeDefined();
      expect(conditionalProp.conditionalFields).toHaveLength(1);
      expect(conditionalProp.conditionalFields?.[0]).toMatchObject({
        name: '',
        type: 'string',
        title: '',
      });
    });

    it('deve adicionar campo condicional a uma propriedade do tipo conditional', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      // Adicionar propriedade raiz
      act(() => {
        result.current.addProperty(null);
      });

      // Atualizar para tipo conditional
      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          type: 'conditional',
          conditionalFields: [],
        });
      });

      // Adicionar campo condicional
      act(() => {
        result.current.addProperty(['0']);
      });

      const conditionalProp = result.current.properties[0];
      expect(conditionalProp.type).toBe('conditional');
      expect(conditionalProp.conditionalFields).toHaveLength(1);
      expect(conditionalProp.conditionalFields?.[0]).toMatchObject({
        name: '',
        type: 'string',
        title: '',
      });
    });

    it('deve adicionar múltiplos campos condicionais', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          type: 'conditional',
          conditionalFields: [],
        });
      });

      act(() => {
        result.current.addProperty(['0']);
        result.current.addProperty(['0']);
        result.current.addProperty(['0']);
      });

      const conditionalProp = result.current.properties[0];
      expect(conditionalProp.conditionalFields).toHaveLength(3);
    });

    it('deve atualizar um campo condicional específico', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          type: 'conditional',
          conditionalFields: [],
        });
      });

      act(() => {
        result.current.addProperty(['0']);
      });

      // Atualizar o campo condicional
      act(() => {
        const conditionalProp = result.current.properties[0];
        const field = conditionalProp.conditionalFields?.[0];
        if (field) {
          result.current.updatePropertyByPath(['0', '0'], {
            ...field,
            name: 'idPromotion',
            title: 'ID da promoção',
            type: 'string',
          });
        }
      });

      const conditionalProp = result.current.properties[0];
      expect(conditionalProp.conditionalFields?.[0]).toMatchObject({
        name: 'idPromotion',
        title: 'ID da promoção',
        type: 'string',
      });
    });

    it('deve adicionar campo condicional do tipo enum', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          name: 'analyticsEvents',
          type: 'conditional',
          conditionalFields: [],
        });
      });

      act(() => {
        result.current.addProperty(['0']);
      });

      act(() => {
        const conditionalProp = result.current.properties[0];
        const field = conditionalProp.conditionalFields?.[0];
        if (field) {
          result.current.updatePropertyByPath(['0', '0'], {
            ...field,
            name: 'eventType',
            title: 'Tipo de Evento',
            type: 'enum',
            enumValues: 'click, view, purchase',
            enumNames: 'Clique, Visualização, Compra',
          });
        }
      });

      const conditionalProp = result.current.properties[0];
      const enumField = conditionalProp.conditionalFields?.[0];
      
      expect(enumField).toMatchObject({
        name: 'eventType',
        title: 'Tipo de Evento',
        type: 'enum',
        enumValues: 'click, view, purchase',
        enumNames: 'Clique, Visualização, Compra',
      });
    });
  });

  describe('Navegação aninhada', () => {
    it('deve obter propriedade por caminho em estrutura aninhada', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      // Criar objeto com filhos
      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          name: 'banner',
          type: 'object',
          objectProperties: [],
        });
      });

      act(() => {
        result.current.addProperty(['0']);
      });

      act(() => {
        const objectProp = result.current.properties[0];
        const child = objectProp.objectProperties?.[0];
        if (child) {
          result.current.updatePropertyByPath(['0', '0'], {
            ...child,
            name: 'title',
            title: 'Título',
          });
        }
      });

      const childProp = result.current.getPropertyByPath(['0', '0']);
      expect(childProp).toMatchObject({
        name: 'title',
        title: 'Título',
      });
    });

    it('deve obter campo condicional por caminho', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          name: 'analytics',
          type: 'conditional',
          conditionalFields: [],
        });
      });

      act(() => {
        result.current.addProperty(['0']);
      });

      act(() => {
        const conditionalProp = result.current.properties[0];
        const field = conditionalProp.conditionalFields?.[0];
        if (field) {
          result.current.updatePropertyByPath(['0', '0'], {
            ...field,
            name: 'trackingId',
            title: 'Tracking ID',
          });
        }
      });

      const fieldProp = result.current.getPropertyByPath(['0', '0']);
      expect(fieldProp).toMatchObject({
        name: 'trackingId',
        title: 'Tracking ID',
      });
    });
  });

  describe('Remover propriedades', () => {
    it('deve remover propriedade raiz', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
        result.current.addProperty(null);
      });

      expect(result.current.properties).toHaveLength(2);

      act(() => {
        result.current.removeProperty(['0']);
      });

      expect(result.current.properties).toHaveLength(1);
    });

    it('deve remover campo condicional', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          type: 'conditional',
          conditionalFields: [],
        });
      });

      act(() => {
        result.current.addProperty(['0']);
        result.current.addProperty(['0']);
      });

      const conditionalProp = result.current.properties[0];
      expect(conditionalProp.conditionalFields).toHaveLength(2);

      act(() => {
        result.current.removeProperty(['0', '0']);
      });

      const updatedProp = result.current.properties[0];
      expect(updatedProp.conditionalFields).toHaveLength(1);
    });
  });

  describe('Exemplo completo: Banner com Analytics', () => {
    it('deve criar estrutura completa similar ao BannerFull e gerar schema correto', () => {
      const { result } = renderHook(() => usePropertyContext(), { wrapper });

      // Criar objeto banner
      act(() => {
        result.current.addProperty(null);
      });

      act(() => {
        const prop = result.current.properties[0];
        result.current.updatePropertyByPath(['0'], {
          ...prop,
          name: 'banner',
          title: 'Banner',
          type: 'object',
          objectProperties: [],
        });
      });

      // Adicionar campo conditional analyticsEvents
      act(() => {
        result.current.addProperty(['0']);
      });

      act(() => {
        const bannerProp = result.current.properties[0];
        const child = bannerProp.objectProperties?.[0];
        if (child) {
          result.current.updatePropertyByPath(['0', '0'], {
            ...child,
            name: 'analyticsEvents',
            title: 'Evento do Analytics',
            type: 'conditional',
            conditionalFields: [],
          });
        }
      });

      // Adicionar campos condicionais
      act(() => {
        result.current.addProperty(['0', '0']); // idPromotion
        result.current.addProperty(['0', '0']); // namePromotion
        result.current.addProperty(['0', '0']); // positionCreative
      });

      // Verificar estrutura intermediária
      let banner = result.current.properties[0];
      expect(banner.name).toBe('banner');
      expect(banner.type).toBe('object');
      expect(banner.objectProperties).toHaveLength(1);

      let analytics = banner.objectProperties?.[0];
      expect(analytics?.name).toBe('analyticsEvents');
      expect(analytics?.type).toBe('conditional');
      
      // TESTE CRÍTICO: Verificar que tem 3 campos condicionais
      if (analytics && 'conditionalFields' in analytics && Array.isArray(analytics.conditionalFields)) {
        expect(analytics.conditionalFields).toHaveLength(3);
        
        // Pegar os campos do estado ATUAL antes de atualizar
        const currentBanner = result.current.properties[0];
        const currentAnalytics = currentBanner.objectProperties?.[0];
        
        if (currentAnalytics && 'conditionalFields' in currentAnalytics && Array.isArray(currentAnalytics.conditionalFields)) {
          const conditionalFields = currentAnalytics.conditionalFields as Array<{
            id: string;
            name: string;
            type: string;
            title: string;
            description?: string;
            defaultValue?: string;
          }>;
          
          // Atualizar cada campo condicional individualmente
          act(() => {
            const field0 = conditionalFields[0];
            result.current.updatePropertyByPath(['0', '0', '0'], {
              ...field0,
              name: 'idPromotion',
              title: 'ID da promoção',
              type: 'string',
            });
          });

          act(() => {
            const bannerProp = result.current.properties[0];
            const analyticsField = bannerProp.objectProperties?.[0];
            if (analyticsField && 'conditionalFields' in analyticsField && Array.isArray(analyticsField.conditionalFields)) {
              const fields = analyticsField.conditionalFields as typeof conditionalFields;
              const field1 = fields[1];
              result.current.updatePropertyByPath(['0', '0', '1'], {
                ...field1,
                name: 'namePromotion',
                title: 'Nome da promoção',
                type: 'string',
              });
            }
          });

          act(() => {
            const bannerProp = result.current.properties[0];
            const analyticsField = bannerProp.objectProperties?.[0];
            if (analyticsField && 'conditionalFields' in analyticsField && Array.isArray(analyticsField.conditionalFields)) {
              const fields = analyticsField.conditionalFields as typeof conditionalFields;
              const field2 = fields[2];
              result.current.updatePropertyByPath(['0', '0', '2'], {
                ...field2,
                name: 'positionCreative',
                title: 'Posição do criativo',
                type: 'string',
              });
            }
          });
        }

        // Verificar nomes após atualização
        banner = result.current.properties[0];
        analytics = banner.objectProperties?.[0];
        
        if (analytics && 'conditionalFields' in analytics && Array.isArray(analytics.conditionalFields)) {
          const fields = analytics.conditionalFields as Array<{ name?: string; title?: string }>;
          expect(fields[0]?.name).toBe('idPromotion');
          expect(fields[0]?.title).toBe('ID da promoção');
          expect(fields[1]?.name).toBe('namePromotion');
          expect(fields[1]?.title).toBe('Nome da promoção');
          expect(fields[2]?.name).toBe('positionCreative');
          expect(fields[2]?.title).toBe('Posição do criativo');
        }

        // TESTE CRÍTICO: Gerar schema e validar estrutura dependencies
        const schema = generateVtexSchema(result.current.properties, 'Test Component');
        
        expect(schema.properties.banner).toBeDefined();
        expect(schema.properties.banner.type).toBe('object');
        expect(schema.properties.banner.properties).toBeDefined();
        expect(schema.properties.banner.properties!.analyticsEvents).toBeDefined();
        expect(schema.properties.banner.properties!.analyticsEvents.enum).toEqual(['none', 'provide']);
        expect(schema.properties.banner.properties!.analyticsEvents.enumNames).toEqual(['Não', 'Sim']);
        
        // Verificar dependencies
        expect(schema.properties.banner.dependencies).toBeDefined();
        expect(schema.properties.banner.dependencies!.analyticsEvents).toBeDefined();
        expect(schema.properties.banner.dependencies!.analyticsEvents.oneOf).toHaveLength(1);
        
        const oneOfSchema = schema.properties.banner.dependencies!.analyticsEvents.oneOf[0];
        expect(oneOfSchema.properties.analyticsEvents).toEqual({ enum: ['provide'] });
        expect(oneOfSchema.properties.idPromotion).toBeDefined();
        expect(oneOfSchema.properties.idPromotion.type).toBe('string');
        // title não deve estar presente em campos dentro de dependencies
        expect(oneOfSchema.properties.namePromotion).toBeDefined();
        // title não deve estar presente em campos dentro de dependencies
        expect(oneOfSchema.properties.positionCreative).toBeDefined();
        // title não deve estar presente em campos dentro de dependencies
      }
    });
  });
});
